
<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="18" @click="dialogFormVisible = true">
        <el-button type="primary">
          Agregar cuenta
        </el-button>
      </el-col>
    </el-row>
    <el-row justify="center" class="key-manager">
      <el-col :span="16">
        <el-table :data="apiKeys">
          <el-table-column fixed prop="name" label="Nombre identificador" width="250" />
          <el-table-column fixed prop="account" label="Cuenta Asociada" width="150" />
          <el-table-column fixed prop="status" label="Estado" width="150" />
          <el-table-column fixed="right" label="Operaciones" width="250">
            <template #default="scope">
              <el-row >
                <el-col :span="12">
                  <el-button link type="primary" size="small" v-if="apiKeys[scope.$index].status === 'inactive'" @click="editAccount(apiKeys[scope.$index].id, 'active')"
                    >Activar</el-button
                  >
                  <el-button link type="primary" size="small" v-if="apiKeys[scope.$index].status === 'active'" @click="editAccount(apiKeys[scope.$index].id, 'inactive')"
                    >Desactivar</el-button
                  >
                </el-col>
                <el-col :span="12">
                <el-popconfirm
                  confirm-button-text="Si"
                  cancel-button-text="No"
                  icon-color="#626AEF"
                  title="Estas seguro que deseas eliminar esta cuenta?"
                  @confirm="removeAccount(scope.$index)"
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
    <el-dialog v-model="dialogFormVisible" title="Agregar Cuenta">
      <el-form :model="form">
       <el-form-item label="Nombre Identificador" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Account" :label-width="formLabelWidth">
          <el-select v-model="form.account" required placeholder="Seleccione el tipo de cuenta">
            <el-option label="Binance" value="binance" />
            <el-option label="Kucoin" value="kucoin" />
          </el-select>
        </el-form-item>
        <el-form-item label="ApiKey" :label-width="formLabelWidth">
          <el-input v-model="form.apiKey" autocomplete="off" />
        </el-form-item>
        <el-form-item label="ApiSecret" :label-width="formLabelWidth">
          <el-input v-model="form.apiSecret" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Passphrase" v-if="form.account === 'kucoin'" :label-width="formLabelWidth">
          <el-input v-model="form.passphrase" required autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-row justify="center">
            <el-col :span="4">
              <el-button @click="dialogFormVisible = false">Cancelar</el-button>
            </el-col>
            <el-col :offset="1" :span="4">
              <el-button type="primary" @click="addAccount"
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

  export default {
    name: 'keysManager',
    data() {
      return {
        form: {
          name: '',
          account:'',
          apiKey: '',
          apiSecret: '',
          passphrase: '',
        },
        dialogFormVisible: false,
        formLabelWidth: '160px',
      }
    },
    props: ['apiKeys'],
    methods: {
      async addAccount() {
        this.dialogFormVisible = false
        try {
          await this.addApiKey(this.form)
          ElMessage({
            message: 'La cuenta se ha agregado correctamente. Se calculará el valor de la billetera en el proximo control',
            type: 'success',
          })
        } catch (err) {
          console.log(err);
          ElMessage.error(err.message);
        }
        this.form = {
          name: '',
          account:'',
          apiKey: '',
          apiSecret: '',
          passphrase: '',
        };
      },
      async removeAccount(idx) {
        await this.removeApiKey(this.apiKeys[idx].id);
        ElMessage({
          message: 'La cuenta se ha desvinculado de forma satisfactoria',
          type: 'success',
        })
      },
      async editAccount(id, status) {
        try {
          if (status === 'active') {
            await this.enableApiKey(id, status);
            ElMessage({
              message: `La cuenta se ha activado satisfactoriamente`,
              type: 'success',
            })
          } else {
            await this.disableApiKey(id, status);
            ElMessage({
              message: `La cuenta se ha desactivado satisfactoriamente`,
              type: 'success',
            })
          }
        } catch(err) {
          ElMessage({
            message: `La cuenta no ha podido ser ${status === 'active' ? 'activada' : 'desactivada'} correctamente`,
            type: 'success',
          })
        }
      },
      ...mapActions(useUserStore, ['addApiKey','removeApiKey', 'enableApiKey', 'disableApiKey'])
    }
  }
</script>
<style lang="scss">
  .el-popconfirm__action{
    button{
        width: auto !important;
    }
  }
  .key-manager{
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