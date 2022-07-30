<template>
  <el-row class="scoped-graph">
    <el-col :span="24">
      <Pie
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :width="width"
        :height="height"
        :plugins="plugins"
        />
    </el-col>
  </el-row>
</template>

<script>
import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function selectColor(number) {
  const hue = number * 137.508; // use golden angle approximation
  return `hsl(${hue},50%,75%)`;
}

export default {
  setup() {
    
  },
  props:['currentWallet', 'minValue'],
  components: { Pie },
  data() {
    return {
      height: 400,
      width: 400,
      datasetIdKey: 'label',
      chartId: 'wallet-history',
      plugins: [ChartDataLabels],
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          datalabels: {
            display: false,
            color: '#000000',
            formatter: (value) => value ? `${Math.round(value)}` : ''
          }
        }

      }
    }
  },
  computed: {
    walletValue() {
      return Math.round(this.currentWallet && this.currentWallet.wallet && this.currentWallet.wallet.value)
    },
    chartData() {
      const defaultValue = {labels: [], datasets: [{backgroundColor: [], data: []}]};
      if(this.currentWallet?.wallet) {
        return this.currentWallet.wallet.assets.reduce((wallet, asset) => {
          if (parseInt(asset.value) > this.minValue){
            wallet.labels.push(asset.coin);
            wallet.datasets[0].data.push(Math.round(asset.value));
            wallet.datasets[0].backgroundColor.push(selectColor(Math.floor(Math.random() * 10)));
          }
          return wallet
        }, defaultValue);
      }
      return defaultValue;
    }
  }
}
</script>

<style lang="scss" scoped>
  .scoped-graph{
    background: rgb(244, 244, 245);
    border-radius: 20px;
    box-shadow: rgb(218 218 222) 1px 1px 2px, rgb(255 255 255) -1px -1px 2px;
    height:100%;
    // padding: 10px 20px;
  }
</style>