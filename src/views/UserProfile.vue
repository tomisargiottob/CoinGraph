
<template>
  <div>
    <el-row justify="center">
      <h1>Perfil de {{user.firstName || 'Anonymous'}}</h1>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <user-statistics></user-statistics>
      </el-col>
    </el-row>
    <el-row class="user-management">
      <el-col :span="22" :offset="1" class="user-management-items">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="Información de usuario" name="1">
            <user-data :user="user" :apiKeys="apiKeys"></user-data>
          </el-collapse-item>
          <el-collapse-item title="Cuentas enlazadas" name="2">
            <keys-manager :apiKeys="apiKeys"></keys-manager>
          </el-collapse-item>
          <el-collapse-item title="Cryptos adicionales" name="3">
            <static-cryptos :staticCryptos="staticCryptos" ></static-cryptos>
          </el-collapse-item>
        </el-collapse>  
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState } from 'pinia';
  import keysManager from '../components/apiKeyManager.vue';
  import staticCryptos from '../components/staticCryptos.vue';
  import userData from '../components/userData.vue';
  import userStatistics from '../components/userStatistics.vue'
  import { useUserStore } from '../store/userStore';

  export default {
    setup() {
      const userStore = useUserStore();
      userStore.getApiKeys();
      userStore.getStaticCryptos();
    },
    data() {
      return {
        activeNames:['1'],
      }
    },
    components: { keysManager, userData, userStatistics, staticCryptos },
    methods() {

    },
    computed: {
      ...mapState(useUserStore, ['user']),
      ...mapState(useUserStore, ['apiKeys']),
      ...mapState(useUserStore, ['staticCryptos'])
    }
  }

</script>

<style lang="scss">
.user-management{
  margin-top: 20px;
  min-height: 80vh;
  .user-management-items {
    height:100%;
    place-items: center;
    background: $graphElements;
    border-radius: 20px;
    box-shadow: $graphShadow 5px 5px 15px;
    padding: 10px 20px;
  }
  .el-collapse-item__header{
    font-weight: 700;
    font-size: 1rem;
    padding: 10px;
  }
}
</style>
