<template>
  <div class="global-graph">
    <el-row>
      <el-col :xs="24" :sm="10" :md="9" :l="7" :xl="5">
        <el-row>
          <span class="value-title">
            Total cartera:
          </span>
        </el-row>
        <el-row class="wallet-value" justify="end">
          <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6">
            <p v-if="variationPercentage < 0" class="negative-percentage">{{variationPercentage}} %</p>
            <p v-if="variationPercentage >= 0" class="positive-percentage">{{variationPercentage}} %</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="19" :lg="19" :xl="19">
            <h1>
              {{formatedValue}} $ 
            </h1>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="14" :md="15" :l="17" :xl="19" class="date-picker">
        <date-picker @searchDates="search" @resetDates="search({})"></date-picker> 
      </el-col>
    </el-row>
    <el-row >
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
  </div>
</template>

<script>
import { useWalletStore } from '../store/walletStore';
import { Line as LineChart } from 'vue-chartjs'
import DatePicker from './datePicker.vue';
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
  components: { LineChart, DatePicker },
  props: ['wallets', 'currentWallet'],
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
    search(dates) {
      const walletStore = useWalletStore();
      walletStore.getWallets(dates.from, dates.to);
    },
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
    formatedValue() {
      let dollarUSLocale = Intl.NumberFormat('en-US');
      return dollarUSLocale.format(Math.round(this.currentWallet.totalValue))
    },
    variationPercentage() {
      if(this.wallets) {
        const position = this.wallets.findIndex((wallet) => wallet._id === this.currentWallet._id);
        if(position <= 0 ){
          return 'N/A'
        }
        return Math.round(((this.currentWallet.totalValue - this.wallets[position - 1].totalValue) / this.currentWallet.totalValue )* 10000)/100
      } 
      return 0;
    },
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
  @import '../styles/variables.scss';

  .global-graph{
    .value-title{
      text-decoration: underline;
      font-weight: 600;
      font-size: 20px;
    }
    .wallet-value {
      position: relative;
      h1{
        margin: 0px;
      }
      p {
        margin: 0px;
        border-radius: 5px;
        padding: 3px;
        width: fit-content;
      }
      .negative-percentage{
        color: rgb(192, 3, 3);
        background-color: rgba(255, 0, 0, 0.253);
      }
      .positive-percentage{
        color: rgb(31, 173, 2);
        background-color: rgba(33, 255, 13, 0.253);
      }

    }
    .date-picker{
      padding-top: 30px;
    }
    height:100%;
    place-items: center;
    background:$graphElements;
    border-radius: 20px;
    box-shadow: $graphShadow 5px 5px 15px;
    padding: 10px 20px;
  }
</style>