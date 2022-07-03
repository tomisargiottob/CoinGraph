<template>
  <div class="global-graph">
    <LineChart
      ref="lineChart"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :width="width"
      :height="height"
      @click="handleClick"
    />
  </div>
</template>

<script>

import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,  
} from 'chart.js'

ChartJS.register(Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
  )

export default {
  name: 'BarChart',
  components: { LineChart },
  props: ['wallets'],
  data() {
    return {
      height: 400,
      width: 800,
      datasetIdKey: 'label',
      chartId: 'wallet-history',
      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    handleClick(event) {
      const graph = this.$refs.lineChart.chart;
      const points = graph.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

      if (points.length) {
        const firstPoint = points[0];
        // const label = graph.data.labels[firstPoint.index];
        const index = graph.data.datasets[firstPoint.datasetIndex].additional[firstPoint.index]
        // const value = graph.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        this.$emit('showWallet', index)
      }
    }
  },
  computed: {
    chartData() {
      const defaultValue = {labels: [], datasets: [{label: 'Valor de cartera', backgroundColor: '#409eff', data: [], additional: [] }]};
      if (this.wallets.length) {
        return this.wallets.reduce((chartData, wallet) => {
          const registryDate = new Date(wallet.createdAt);
          chartData.labels.push(`${registryDate.getDate()}-${registryDate.getMonth()}-${registryDate.getFullYear()}`);
          chartData.datasets[0].data.push(wallet.wallet.value);
          chartData.datasets[0].additional.push(wallet._id);
          return chartData;
        }, defaultValue)
      }
      return defaultValue;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>