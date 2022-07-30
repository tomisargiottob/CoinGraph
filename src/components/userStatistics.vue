<template>
  <div>
    <el-row justify="center" class="user-statistics">
      <el-col :span="4">
        <el-row class="counter">
          {{apiKeys.length}}</el-row>
        <el-row class="counter-description"> Billeteras añadidas</el-row>
      </el-col>
      <el-col :span="4">
        <el-row class="counter">
          {{walletValue}} $</el-row>
        <el-row class="counter-description"> Valor de cartera</el-row>
      </el-col>
      <el-col :span="4">
        <el-row class="counter">
          {{cryptoAmount}}</el-row>
        <el-row class="counter-description"> Cryptos </el-row>
      </el-col>
      <el-col :span="4">
        <el-row class="counter">
          {{cryptoWeight}}</el-row>
        <el-row class="counter-description"> Mayor porcentaje </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState } from 'pinia';
  import { useUserStore } from '../store/userStore';
  import { useWalletStore } from '../store/walletStore';

  export default {
    name: 'userStatistics',
    computed: {
      ...mapState(useWalletStore, ['walletValue', 'cryptoAmount', 'cryptoWeight']),
      ...mapState(useUserStore, ['apiKeys']),
    }
  }

</script>

<style lang="scss" scoped>
  .user-statistics{
    height:100%;
    place-items: center;
    background: rgb(244, 244, 245);
    border-radius: 20px;
    box-shadow: rgb(218 218 222) 1px 1px 2px, rgb(255 255 255) -1px -1px 2px;
    padding: 10px 20px;
    .counter{
      place-content: center;
      font-size:x-large;
      font-weight: 700;
    }
    .counter-description{
      place-content: center;
    }
  }
</style>