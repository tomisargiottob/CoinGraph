<template>
  <div>
    <h1>Dashboard</h1>
    <div class="date-filter">
      <date-picker @searchDates="search"></date-picker>

    </div>
    <div class="graph-section">
      <div class="main-graph">
        <global-graph :wallets="wallets"></global-graph>
      </div>
       <div class="scoped-graph">
        <scoped-graph :currentWallet="currentWallet"></scoped-graph>
      </div>
    </div>
    <div class="composition-table">

    </div>
  </div>
</template>

<script>
  import DatePicker from '../components/datePicker.vue';
  import ScopedGraph from '../components/scopedGraph.vue';
  import GlobalGraph from '../components/globalGraph.vue';
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
    components: { DatePicker, ScopedGraph, GlobalGraph },
    computed: {
      ...mapState(useWalletStore, ['wallets']),
      ...mapState(useWalletStore, ['currentWallet'])
    },
    methods: {
      search(dates) {
        console.log(dates);
        // const walletStore = useWalletStore();
        // walletStore.getWallets();
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
    background-color: red;
    min-height: 400px;
    display: flex;
    margin-bottom: 30px;
    .main-graph{
      padding: 20px;
      background-color: yellow;
      min-height:400px;
      width: 70%;
    }
    .scoped-graph{
      padding: 20px;
      background-color: green;
      min-height:400px;
      width: 30%;
    }
  }
  .composition-table{
    background-color: gray;
    min-height: 200px;
  }
</style>
