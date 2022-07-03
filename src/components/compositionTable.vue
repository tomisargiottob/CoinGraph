<template>
  <el-table 
  :data="walletCoins" 
  style="width: 50%; margin: 0 auto;"
  :default-sort="{ prop: 'value', order: 'descending' }"
  :summary-method="getSummaries"
  show-summary
  border
  stripe
  >
    <el-table-column prop="coin" label="Crypto" width="180" />
    <el-table-column sortable prop="ammount" label="Cantidad" width="180" />
    <el-table-column sortable prop="value" label="Valor ($)" />
    <el-table-column sortable prop="marketPrice" label="Precio de Mercado ($)" />
  </el-table>
</template>

<script>
export default {
  setup() {
    
  },
  props: ['wallet', 'minValue'],
  computed: {
    walletCoins() {
      if (!this.wallet.wallet) return [];
      return this.wallet.wallet.assets.reduce((wallet, {coin, value, ammount}) => {
        if(value > this.minValue){
          wallet.push({ coin , value: Math.round(value), ammount , marketPrice: Math.floor((value/ammount) * 100) / 100 });
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
          sums[index] = 'Valor total'
          return
        }
        if (index === 1) {
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

</style>