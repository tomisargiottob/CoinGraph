
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
      <el-col :span="12">
        <el-table :data="apiKeys">
          <el-table-column fixed prop="account" label="Cuenta Asociada" width="150" />
          <el-table-column fixed prop="status" label="Estado" width="150" />
          <el-table-column fixed="right" label="Operaciones" width="250">
            <template #default="scope">
              <el-row >
                <el-col :span="12">
                  <el-button link type="primary" size="small" @click="editAccount"
                    >Editar</el-button
                  >
                </el-col>
                <el-col :span="12">
                <el-popconfirm
                  confirm-button-text="Si"
                  cancel-button-text="No"
                  icon-color="#626AEF"
                  title="Are you sure to delete this?"
                  @confirm="removeAccount(scope.$index)"
                >
                  <template #reference>
                    <el-button link type="danger" size="small"
                      >Remove</el-button
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
        <el-form-item label="Account" :label-width="formLabelWidth">
          <el-select v-model="form.account" placeholder="Please select a zone">
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
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-row justify="center">
            <el-col :span="4">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
            </el-col>
            <el-col :offset="1" :span="4">
              <el-button type="primary" @click="addAccount"
                >Confirm</el-button
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
          account:'',
          apiKey: '',
          apiSecret: '',
        },
        dialogFormVisible: false,
        formLabelWidth: '140px',
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
          ElMessage.error(err.message);
        }
        this.form = {
          account:'',
          apiKey: '',
          apiSecret: '',
        };
      },
      async removeAccount(idx) {
        console.log(this.apiKeys[idx].id);
        await this.removeApiKey(this.apiKeys[idx].id)
        ElMessage({
          message: 'La cuenta se ha desvinculado de forma satisfactoria',
          type: 'success',
        })
      },
      editAccount() {
        console.log(this.apiKeys);
      },
      ...mapActions(useUserStore, ['addApiKey','removeApiKey'])
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