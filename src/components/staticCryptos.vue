<template>
  <div>
   <el-row>
      <el-col :span="4" :offset="18" @click="showDialogForm()">
        <el-button type="primary">
          Agregar crypto
        </el-button>
      </el-col>
    </el-row>
    <el-row class="static-cryptos">
      <el-col :span="16" :offset="4">
        <el-table table-layout="auto" :data="staticCryptos" style="width: 100%">
          <el-table-column fixed prop="asset" label="Crypto" />
          <el-table-column prop="amount" label="Cantidad" />
          <el-table-column prop="averagePrice" label="Precio primedio de compra"/>
          <el-table-column prop="formatedDate" label="Fecha de adición"/>
          <el-table-column label="Operaciones">
            <template #default="scope">
              <el-row >
                <el-col :span="12">
                  <el-button link type="primary" size="small" @click="showDialogForm(scope.$index)">
                    Editar
                  </el-button>
                </el-col>
                <el-col :span="12">
                <el-popconfirm
                  confirm-button-text="Si"
                  cancel-button-text="No"
                  icon-color="#626AEF"
                  title="Estas seguro que deseas eliminar esta crypto?"
                  @confirm="removeCrypto(scope.$index)"
                >
                  <template #reference>
                    <el-button link type="danger" size="small"
                      >Eliminar</el-button
                    >
                  </template>
                </el-popconfirm>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>  
    <el-dialog v-model="dialogFormVisible" :title="form.title">
      <el-form :model="form">
        <el-form-item label="Crypto" :label-width="formLabelWidth">
          <el-select v-model="form.asset" :disabled="form.edit" :remote="!form.edit" :remote-method="searchCryptos" :loading="loading" filterable placeholder="Please select a zone">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
       <el-form-item label="Cantidad" :label-width="formLabelWidth">
          <el-input v-model="form.amount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Precio promedio" :label-width="formLabelWidth">
          <el-input v-model="form.averagePrice" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-row justify="center">
            <el-col :span="4">
              <el-button @click="dialogFormVisible = false">Cancelar</el-button>
            </el-col>
            <el-col :offset="1" :span="4">
              <el-button type="primary" @click="sendForm"
                >Confirmar</el-button
              >
            </el-col>
          </el-row>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../store/userStore';
import { ElMessage } from 'element-plus'
import client from '../services/client'

export default {
  name: 'staticCrypto',
  props: ['staticCryptos'],
  data() {
    return {
      form: {
        asset: '',
        amount: '',
        averagePrice: '',
        type: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '160px',
      loading: false,
      options: [],
      pendingSearch: '',
    }
  },
  methods: {
    searchCryptos(query) {
      if (query) {
        this.loading = true
        clearTimeout(this.pendingSearch)
        this.pendingSearch = setTimeout(async () => {
          this.loading = false
          const filteredCryptos = await client.getAvailableCryptos(query);
          this.options = filteredCryptos.map((crypto) => ({ label: crypto, value: crypto }))
        }, 200)
      } else {
        this.options = []
      }
    },
    showDialogForm(idx) {
      if (idx !== undefined) {
        this.form = this.staticCryptos[idx];
        this.form.title = 'Editar Crypto'
        this.form.edit = true
        this.formCallback = this.editCrypto;
      } else {
        this.form = {
          asset: '',
          amount: '',
          averagePrice: '',
          title: 'Agregar Crypto',
        }
        this.formCallback = this.addCrypto;
      }
      this.dialogFormVisible = true;
    },
    sendForm() {
      this.formCallback(this.form);
    },
    async addCrypto(crypto) {
      try {
        await this.addStaticCrypto(crypto)
        ElMessage({
          message: 'Se ha agregado la cryptomoneda correctamente, se añadirá en el proximo calculo de valor',
          type: 'success',
        })
        this.form = {};
        this.dialogFormVisible = false;
      } catch (err) {
        ElMessage.error({
          message: err.message,
          type: 'error',
        });
      }
    },
    async removeCrypto(idx) {
      try {
        await this.removeStaticCrypto(this.staticCryptos[idx].id);
        ElMessage({
          message: 'Se ha eliminado la cryptomoneda de la billetera estatica',
          type: 'success',
        })
      } catch (err) {
        ElMessage({
          message: err.message,
          type: 'error',
        })
      }
    },
    async editCrypto(crypto) {
      try {
        await this.editStaticCrypto(crypto);
        this.dialogFormVisible = false;
         ElMessage({
          message: `Se ha actualizado la informacion `,
          type: 'success',
        })
      } catch(err) {
        ElMessage({
          message: `No se ha podido actualizar la informacion de la cryptomoneda`,
          type: 'error',
        })
      }
    },
    ...mapActions(useUserStore, ['addStaticCrypto','removeStaticCrypto', 'editStaticCrypto'])
  }
}
</script>

<style lang="scss">
  .el-popconfirm__action{
    button{
      width: auto !important;
    }
  }
  .static-cryptos{
    thead{
      tr{
        th{
          text-align: center !important;   
        }
      }
    }
    tbody{
      tr{
        td{
          text-align: center !important;   
        }
      }
    }
  }
</style>