<template>
  <el-row justify="center" style="width:100%">
    <el-col :xs="{span: 22, offset: 0}" :sm="{span: 16, offset: 0}" :md="{span: 16, offset: 0}" :lg="{span: 14, offset: 0}" :xl="{span: 12, offset: 0}">
      <el-table
      class="table-data" 
      :data="walletCoins" 
      table-layout="auto"
      :default-sort="{ prop: 'value', order: 'descending' }"
      style="max-width: 100%"
      border
      stripe
      v-if="innerWidth>300"
      >
        <el-table-column prop="coin" label="Crypto" min-width="100"/>
        <el-table-column sortable prop="ammount" label="Cantidad" min-width="100" />
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
      if (!this.wallet.wallet) return [];
      return this.wallet.wallet.assets.reduce((wallet, {coin, value, ammount}) => {
        if(value > this.minValue){
          wallet.push({ coin , value: Math.round(value), ammount: Math.round(ammount*1000)/1000 , marketPrice: Math.floor((value/ammount) * 100) / 100 });
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
  .table-data{
    margin-bottom: 20px;
    background: rgb(244, 244, 245);
    border-radius: 20px;
    box-shadow: rgb(218 218 222) 1px 1px 2px, rgb(255 255 255) -1px -1px 2px;
    padding: 10px 20px;
  }
  .el-table{
    // background-color: transparent !important;
  }
</style>