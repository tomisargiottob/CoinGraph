<template>
  <div>
   <el-row>
      <el-col :span="4" :offset="18" @click="showDialogForm()">
        <el-button type="primary">
          {{$t('profileView.userManagement.staticCrypto.add')}}
        </el-button>
      </el-col>
    </el-row>
    <el-row class="static-cryptos">
      <el-col :span="16" :offset="4">
        <el-table table-layout="auto" :data="staticCryptos" style="width: 100%">
          <el-table-column fixed prop="asset" :label="$t('profileView.userManagement.staticCrypto.tableHeaders.crypto')" />
          <el-table-column prop="amount" :label="$t('profileView.userManagement.staticCrypto.tableHeaders.amount')" />
          <el-table-column prop="averagePrice" :label="$t('profileView.userManagement.staticCrypto.tableHeaders.averagePrice')"/>
          <el-table-column prop="formatedDate" :label="$t('profileView.userManagement.staticCrypto.tableHeaders.dateAdded')"/>
          <el-table-column :label="$t('profileView.userManagement.staticCrypto.tableHeaders.actions')">
            <template #default="scope">
              <el-row >
                <el-col :span="12">
                  <el-button link type="primary" size="small" @click="showDialogForm(scope.$index)">
                    {{$t('commonButtons.edit')}}
                  </el-button>
                </el-col>
                <el-col :span="12">
                <el-popconfirm
                  confirm-button-text="Si"
                  cancel-button-text="No"
                  icon-color="#626AEF"
                  :title="$t('profileView.userManagement.staticCrypto.confirmDelete')"
                  @confirm="removeCrypto(scope.$index)"
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
    <el-dialog v-model="dialogFormVisible" :title="form.title">
      <el-form :model="form">
        <el-form-item label="Crypto" :label-width="formLabelWidth">
          <el-select v-model="form.asset" :disabled="form.edit" :remote="!form.edit" :remote-method="searchCryptos" :loading="loading" filterable :placeholder="$t('profileView.userManagement.staticCrypto.selectCrypto')">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
       <el-form-item :label="$t('profileView.userManagement.staticCrypto.tableHeaders.amount')" :label-width="formLabelWidth">
          <el-input v-model="form.amount" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('profileView.userManagement.staticCrypto.tableHeaders.averagePrice')" :label-width="formLabelWidth">
          <el-input v-model="form.averagePrice" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-row justify="center">
            <el-col :span="4">
              <el-button @click="dialogFormVisible = false">{{$t('commonButtons.cancel')}}</el-button>
            </el-col>
            <el-col :offset="1" :span="4">
              <el-button type="primary" @click="sendForm"
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
        this.form.title = this.$t('profileView.userManagement.staticCrypto.edit')
        this.form.edit = true
        this.formCallback = this.editCrypto;
      } else {
        this.form = {
          asset: '',
          amount: '',
          averagePrice: '',
          title: this.$t('profileView.userManagement.staticCrypto.add'),
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
          message: this.$t('profileView.userManagement.staticCrypto.successAdd'),
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
          message: this.$t('profileView.userManagement.staticCrypto.successDelete'),
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
          message: this.$t('profileView.userManagement.staticCrypto.successEdit'),
          type: 'success',
        })
      } catch(err) {
        ElMessage({
          message: this.$t('profileView.userManagement.staticCrypto.failedEdit'),
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