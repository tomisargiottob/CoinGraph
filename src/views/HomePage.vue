<template>
  <div>
    <h1>Dashboard</h1>
    <div class="date-filter">
      <date-picker @searchDates="search" @resetDates="search({})"></date-picker>

    </div>
    <div class="graph-section">
      <div class="main-graph">
        <global-graph :wallets="wallets" @showWallet="chooseWallet"></global-graph>
      </div>
       <div class="scoped-graph">
        <scoped-graph :currentWallet="currentWallet" :minValue="10"></scoped-graph>
      </div>
    </div>
    <div class="composition-table">
      <composition-table :wallet="currentWallet" :minValue="10"></composition-table>
    </div>
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
  .date-filter{
    width:100%;
    min-height: 50px;
  }
  .graph-section{
    width:100%;
    min-height: 400px;
    display: flex;
    margin-bottom: 30px;
    .main-graph{
      padding: 20px;
      min-height:400px;
      width: 70%;
    }
    .scoped-graph{
      padding: 20px;
      min-height:400px;
      width: 30%;
    }
  }
  .composition-table{
    min-height: 200px;
    margin-bottom:50px;
  }
</style>
