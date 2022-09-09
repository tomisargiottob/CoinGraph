<template>
  <el-row v-loading="loadingWallets" element-loading-text="Loading..." element-loading-background="rgba(256, 256, 256, 1)" justify="center">
    <el-col :span="24">
      <h1 class="main-title">{{$t('dashboardView.title')}}</h1>
      <el-row v-if="!wallets.length" justify="center" class="home-view">
        <el-col class="icon-place" :span="24">
          <RouterLink to="/profile">
            <el-icon><CirclePlus /></el-icon>
          </RouterLink>
        </el-col>
        <el-col class="warning-place" :span="12">      
          <h2>
            {{$t('dashboardView.noWallets')}}
          </h2>
          <RouterLink to="/profile">
            <span class="link-button">
              {{$t('dashboardView.profile')}}
            </span>
          </RouterLink>
        </el-col>
        <el-row>
          <span class="space-corrector">
          </span>  
        </el-row>
      </el-row>
      <el-row v-if="wallets.length" class="home-view">
        <el-row class="statistics-section" justify="center">
          <el-col class="filter-form" :xs="{span: 24, offset: 0}" :sm="{span: 18, offset: 0}" :md="{span: 18, offset: 0}" :lg="{span: 16, offset: 0}" :xl="{span: 16, offset: 0}">
            <user-statistics></user-statistics>
          </el-col>
        </el-row>
        <el-row class="graph-section" justify="center">
          <el-col class="main-graph" :xs="{span: 24, offset: 0}" :sm="{span: 18, offset: 0}" :md="{span: 18, offset: 0}" :lg="{span: 16, offset: 0}" :xl="{span: 16, offset: 0}">
            <global-graph :wallets="wallets" :currentWallet="currentWallet" @showWallet="chooseWallet"></global-graph>
          </el-col>
        </el-row>
        <el-row class="secondary-section" justify="center">
          <el-col class="scoped-graph" :xs="{span: 24, offset: 0}" :sm="{span: 10, offset: 0}" :md="{span: 10, offset: 0}" :lg="{span: 8, offset: 0}" :xl="{span: 8, offset: 0}">
            <scoped-graph :currentWallet="currentWallet" :minValue="10"></scoped-graph>
          </el-col>
          <el-col class="composition-table" :xs="{span: 24, offset: 0}" :sm="{span: 18, offset: 0}" :md="{span: 18, offset: 0}" :lg="{span: 16, offset: 0}" :xl="{span: 16, offset: 0}">
            <composition-table :wallet="currentWallet" :minValue="10"></composition-table>
          </el-col>
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

  import { ElMessage } from 'element-plus'
  import ScopedGraph from '../components/scopedGraph.vue';
  import GlobalGraph from '../components/globalGraph.vue';
  import CompositionTable from '../components/compositionTable.vue';
  import UserStatistics from '../components/userStatistics.vue'
  import { useWalletStore } from '../store/walletStore';
  import { useUserStore } from '../store/userStore';
  useUserStore
  import { mapState } from 'pinia';

  export default {
    name: "dashboardHome",
    setup() {
      const walletStore = useWalletStore();
      const userStore = useUserStore();
      walletStore.getWallets(); 
      userStore.getApiKeys();
    },
    data() {
      return {
        dates:{},
      };
    },
    components: { ScopedGraph, GlobalGraph, CompositionTable, UserStatistics },
    computed: {
      ...mapState(useWalletStore, ['wallets', 'currentWallet', 'loadingWallets']),
    },
    methods: {
      chooseWallet(account) {
        if (account) {
          const walletStore = useWalletStore();
          walletStore.showAccount(account.id, account.type);
        } else {
          ElMessage({
            message: this.$t('dashboardView.noWalletRegister'),
            type: 'warning',
          })
        }
      }
    },
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';
  .main-title {
    font-weight: 700;
    font-size: 40px;
    width: 100%;
  }
  .statistics-section{
    width: 100%;
    padding: 20px;
  }
  .icon-place{
    padding-top: 20vh;
    .el-icon{
      color: $main-font-color;
      font-size:50px;
    }
  }
  .warning-place{
    .link-button{
      padding: 5px 20px;
      background-color: #409eff;
      border-radius: 5px;
    }
    a{
      color: white;
      font-size:30px;
      text-decoration: none;
    }
  }
  .space-corrector{
    min-height: 60vh;
  }
  .graph-section{
    width:100%;
    min-height: 400px;
    margin-bottom: 10px;
    .main-graph{
      padding: 0px 20px;
      min-height:400px;
    }
  }
  .secondary-section {  
    width:100%;
    .scoped-graph{
      max-height: 500px;
      min-height: 200px;
      padding: 20px;
    }
    .composition-table{
      width:100%;
      padding: 20px;
      min-height: 200px;
      margin-bottom:50px;
    }
  }

  @media screen and (max-width: 1100px) {
    .graph-section{
      width:100%;
      min-height: 300px;
      display: flex;
      margin-bottom: 30px;
      .main-graph{
        min-height:300px;
      }
    }
  }
  @media screen and (max-width: 900px) {
    .graph-section{
      width:100%;
      min-height: 300px;
      display: block;
      margin-bottom: 30px;
      .main-graph{
        margin: 0 auto;
      }
    }
  }
</style>
