
<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="18" @click="dialogFormVisible = true">
        <el-button type="primary">
          {{$t('profileView.userManagement.apiKeyManager.add')}}
        </el-button>
      </el-col>
    </el-row>
    <el-row justify="center" class="key-manager">
      <el-col :span="16">
        <el-table :data="apiKeys">
          <el-table-column prop="name" :label="$t('profileView.userManagement.apiKeyManager.addDialog.name')" width="250" />
          <el-table-column prop="account" label="Cuenta Asociada" width="150" />
          <el-table-column prop="status" label="Estado" width="150" />
          <el-table-column label="Operaciones" width="250">
            <template #default="scope">
              <el-row >
                <el-col :span="12">
                  <el-button link type="primary" size="small" v-if="apiKeys[scope.$index].status === 'inactive'" @click="editAccount(apiKeys[scope.$index].id, 'active')"
                    >{{$t('profileView.userManagement.apiKeyManager.enable')}}</el-button
                  >
                  <el-button link type="primary" size="small" v-if="apiKeys[scope.$index].status === 'active'" @click="editAccount(apiKeys[scope.$index].id, 'inactive')"
                    >{{$t('profileView.userManagement.apiKeyManager.disable')}}</el-button
                  >
                </el-col>
                <el-col :span="12">
                <el-popconfirm
                  confirm-button-text="Si"
                  cancel-button-text="No"
                  icon-color="#626AEF"
                  :title="$t('profileView.userManagement.apiKeyManager.confirmDelete')"
                  @confirm="removeAccount(scope.$index)"
                >
                  <template #reference>
                    <el-button link type="danger" size="small"
                      >{{$t('commonButtons.delete')}}</el-button
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
       <el-form-item :label="$t('profileView.userManagement.apiKeyManager.addDialog.name')" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('profileView.userManagement.apiKeyManager.addDialog.account')" :label-width="formLabelWidth">
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
              <el-button @click="dialogFormVisible = false">{{$t('commonButtons.cancel')}}</el-button>
            </el-col>
            <el-col :offset="1" :span="4">
              <el-button type="primary" @click="addAccount"
                >{{$t('commonButtons.confirm')}}</el-button
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
            message: this.$t('profileView.userManagement.apiKeyManager.addDialog.successMessage'),
            type: 'success',
          })
        } catch (err) {
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
          message: this.$t('profileView.userManagement.apiKeyManager.deleteSuccess'),
          type: 'success',
        })
      },
      async editAccount(id, status) {
        try {
          if (status === 'active') {
            await this.enableApiKey(id, status);
            ElMessage({
              message: this.$t('profileView.userManagement.apiKeyManager.enableSuccess'),
              type: 'success',
            })
          } else {
            await this.disableApiKey(id, status);
            ElMessage({
              message: this.$t('profileView.userManagement.apiKeyManager.disableSuccess'),
              type: 'success',
            })
          }
        } catch(err) {
          ElMessage({
            message: this.$t('profileView.userManagement.apiKeyManager.disableSuccess', { variable: status === 'active' ? this.$t('profileView.userManagement.apiKeyManager.enabled') : this.$t('profileView.userManagement.apiKeyManager.disabled')}),
            type: 'warning',
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