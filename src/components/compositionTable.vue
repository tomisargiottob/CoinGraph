<template>
  <el-row justify="center" style="width:100%">
    <el-col :span="24">
      <el-table
      class="table-data" 
      :data="walletCoins" 
      height="480"
      table-layout="auto"
      :default-sort="{ prop: 'value', order: 'descending' }"
      stripe
      v-if="innerWidth>300"
      >
        <el-table-column fixed prop="coin" label="Crypto" min-width="100"/>
        <el-table-column sortable prop="amount" label="Cantidad" min-width="100" />
        <el-table-column sortable prop="value" label="Valor ($)" min-width="100"  />
        <el-table-column sortable prop="marketPrice" label="Precio de Mercado ($)" min-width="150" v-if="innerWidth>800"/>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  setup() {
    
  },
  props: ['wallet', 'minValue'],
  data() {
    return {
      innerWidth: window.innerWidth
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.innerWidth = window.innerWidth
    })
  },
  computed: {
    walletCoins() {
      if (!this.wallet.currentFocus) return [];
      return this.wallet.currentFocus.assets.reduce((wallet, {coin, value, amount}) => {
        if(value > this.minValue){
          wallet.push({ coin , value: Math.round(value), amount: Math.round(amount*1000)/1000 , marketPrice: Math.floor((value/amount) * 100) / 100 });
        }
        return wallet
      },[])
    }
  },
  methods: {
    getSummaries(param){
      const { columns, data } = param
      const sums= []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        if (index === 3) {
          sums[index] = ''
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => Number.isNaN(value))) {
          sums[index] = `$ ${values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!Number.isNaN(value)) {
              return prev + Math.round(curr)
            } else {
              return prev
            }
          }, 0)}`
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    }
  }
}
</script>

<style lang="scss">
  .el-table {
    .el-table__cell{
      text-align: center !important;
      
    }
  }
  .table-data{
    th{
      font-size: 20px;
      color: #2c3e50 !important;
      background-color: $main-background !important;
    }
    max-height: 500px;
    background:$graphElements;
    border-radius: 20px;
    box-shadow: $graphShadow 5px 5px 15px;
    padding: 10px 20px;
  }
</style>