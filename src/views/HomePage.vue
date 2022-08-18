<template>
  <div>
    <h1>Dashboard</h1>
    <el-row v-if="!wallets.length" justify="center" class="home-view">
      <el-col class="icon-place" :span="24">
        <RouterLink to="/profile">
          <el-icon><CirclePlus /></el-icon>
        </RouterLink>
      </el-col>
      <el-col class="warning-place" :span="12">      
        <h2>
          No se han encontrado registros del usuario, por favor asegurate de haber conectado las cuentas a seguir o agregar manualmente tus cryptos
        </h2>
        <RouterLink to="/profile">
          <span class="link-button">
            Perfil
          </span>
        </RouterLink>
      </el-col>
      <el-row>
        <span class="space-corrector">
        </span>  
      </el-row>
    </el-row>
    <el-row v-if="wallets.length" class="home-view">
      <el-row class="date-filter" justify="center">
        <el-col class="filter-form" :xs="{span: 24, offset: 0}" :sm="{span: 18, offset: 0}" :md="{span: 18, offset: 0}" :lg="{span: 16, offset: 0}" :xl="{span: 16, offset: 0}">
          <date-picker @searchDates="search" @resetDates="search({})"></date-picker>
        </el-col>
      </el-row>
      <el-row class="graph-section" justify="center">
        <el-col class="main-graph" :xs="{span: 24, offset: 0}" :sm="{span: 18, offset: 0}" :md="{span: 18, offset: 0}" :lg="{span: 16, offset: 0}" :xl="{span: 16, offset: 0}">
          <global-graph :wallets="wallets" @showWallet="chooseWallet"></global-graph>
        </el-col>
        <el-col class="scoped-graph" :xs="{span: 10, offset: 0}" :sm="{span: 10, offset: 0}" :md="{span: 10, offset: 0}" :lg="{span: 8, offset: 0}" :xl="{span: 8, offset: 0}">
          <scoped-graph :currentWallet="currentWallet" :minValue="10"></scoped-graph>
        </el-col>
      </el-row>
      <el-row class="composition-table" justify="center">
        <composition-table :wallet="currentWallet" :minValue="10"></composition-table>
      </el-row>
    </el-row>
  </div>
</template>

<script>

  import { ElMessage } from 'element-plus'
  import DatePicker from '../components/datePicker.vue';
  import ScopedGraph from '../components/scopedGraph.vue';
  import GlobalGraph from '../components/globalGraph.vue';
  import CompositionTable from '../components/compositionTable.vue';
  import { useWalletStore } from '../store/walletStore';
  import { mapState } from 'pinia';

  export default {
    name: "dashboardHome",
    setup() {
      const walletStore = useWalletStore();
      walletStore.getWallets(); 
    },
    data() {
      return {
        dates:{}
      };
    },
    components: { DatePicker, ScopedGraph, GlobalGraph, CompositionTable },
    computed: {
      ...mapState(useWalletStore, ['wallets']),
      ...mapState(useWalletStore, ['currentWallet'])
    },
    methods: {
      search(dates) {
        const walletStore = useWalletStore();
        walletStore.getWallets(dates.from, dates.to);
      },
      chooseWallet(account) {
        if (account) {
          const walletStore = useWalletStore();
          walletStore.showAccount(account.id, account.type);
        } else {
          ElMessage({
            message: 'No se ha recopilado informacion de la cartera en dicha fecha',
            type: 'warning',
          })
        }
      }
    },
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';
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
  .date-filter{
    width:100%;
    min-height: 50px;
    .filter-form{
       height:100%;
      place-items: center;
      background: rgb(244, 244, 245);
      border-radius: 20px;
      box-shadow: rgb(218 218 222) 1px 1px 2px, rgb(255 255 255) -1px -1px 2px;
      padding: 10px 20px;
    }
  }
  .graph-section{
    width:100%;
    min-height: 400px;
    display: flex;
    margin-bottom: 30px;
    .main-graph{
      padding: 20px;
      min-height:400px;
    }
    .scoped-graph{
      padding: 20px;
      min-height:400px;
    }
  }
  .composition-table{
    width:100%;
    min-height: 200px;
    margin-bottom:50px;
  }

  @media screen and (max-width: 1100px) {
    .graph-section{
    width:100%;
    min-height: 300px;
    display: flex;
    margin-bottom: 30px;
    .main-graph{
      padding: 20px;
      min-height:300px;
    }
    .scoped-graph{
      padding: 20px;
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
      padding: 20px;
      margin: 0 auto;
    }
    .scoped-graph{
      padding: 20px;
      min-width: 300px;
      margin: 0 auto;
    }
  }
  }
</style>
