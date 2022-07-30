<template>
  <div>
    <h1>Dashboard</h1>
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
  </div>
</template>

<script>
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
      chooseWallet(id) {
        const walletStore = useWalletStore();
        walletStore.showWallet(id);
      }
    },
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';
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
