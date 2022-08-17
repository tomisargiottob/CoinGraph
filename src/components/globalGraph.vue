<template>
  <el-row class="global-graph">
    <el-col>
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
    </el-col>
  </el-row>
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
      width: 400,
      datasetIdKey: 'label',
      chartId: 'wallet-history',
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
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
      const defaultDataSet = {label: '', backgroundColor: '#409eff', data: [], additional: [] }
      const chartData = {labels: [], datasets: []};
      const globalPosition = { value: [], additional: []};
      if (this.wallets.length) {
        const extraData = {};
        const accountNames = {};
        const accountsHistory = this.wallets.reduce((accountHistory, wallet) => {
          let value = 0;
          for (const account of wallet.accounts) {
            if (!accountHistory[account.apiKeyId]) {
              accountHistory[account.apiKeyId] = Array(chartData.labels.length).fill(0);
              extraData[account.apiKeyId] = Array(chartData.labels.length).fill(0);
              accountNames[account.apiKeyId] = account.account
            }
            extraData[account.apiKeyId].push({ id: wallet._id, type: account.account });
            accountHistory[account.apiKeyId].push(account.value)
            value += account.value; 
          }
          Object.keys(accountHistory).forEach((accountName) => {
            if (accountHistory[accountName].length <= chartData.labels.length) {
              accountHistory[accountName].push(0);
              extraData[accountName].push(0);
            }
          })
          globalPosition.additional.push({ id: wallet._id, type: 'global' });
          globalPosition.value.push(value);
          const registryDate = new Date(wallet.createdAt);
          chartData.labels.push(`${registryDate.getDate()}-${registryDate.getMonth()}-${registryDate.getFullYear()}`);
          return accountHistory;
        }, {});
        for (const [id, accountHistory] of Object.entries(accountsHistory)) {
          const filledDataSet = { ...defaultDataSet }
          filledDataSet.additional = extraData[id];
          filledDataSet.data = accountHistory;
          filledDataSet.backgroundColor = `hsl(${Math.floor(Math.random() * 10) * 137.508 },50%,75%)`,
          filledDataSet.label = `Valor de cartera ${accountNames[id]}`
          chartData.datasets.push(filledDataSet);
        }
        if(Object.keys(accountsHistory).length > 1) {
          const filledGlobalDataSet = defaultDataSet;
          filledGlobalDataSet.data = globalPosition.value;
          filledGlobalDataSet.additional = globalPosition.additional;
          filledGlobalDataSet.label = `Valor de cartera global`
          chartData.datasets.push(filledGlobalDataSet);
        }
      }
      return chartData;
    }
  }
}
</script>

<style lang="scss" scoped>
  .global-graph{
    height:100%;
    place-items: center;
    background: rgb(244, 244, 245);
    border-radius: 20px;
    box-shadow: rgb(218 218 222) 1px 1px 2px, rgb(255 255 255) -1px -1px 2px;
    padding: 10px 20px;
  }
</style>