<template>
	<el-menu
	:default-active="activeIndex"
	mode="horizontal"
	:ellipsis="false"
	text-color="black"
	@select="handleSelect"
	>
  <el-row class="main-menu"> 
    <el-col :xs="authStore.authenticated ? 24 : 11" :sm="authStore.authenticated ? 24 : 14" :md="authStore.authenticated ? 24 : 14" :lg="authStore.authenticated ? 24 : 16" :xl="authStore.authenticated ? 24 : 16">
      <el-row>
        <el-col :span="!authStore.authenticated ? 24 : 10">
          <el-menu-item index="0">
            <el-image src="./coinGraphMin.png"/>
          </el-menu-item>
        </el-col>
        <el-col v-if="authStore.authenticated" :xs="0" :sm="0" :md="14" :lg="14" :xl="14">
          <el-row justify="end">
            <el-menu-item index="1">Dashboard</el-menu-item>
            <el-sub-menu index="2">
              <template #title>Perfil</template>
              <el-menu-item index="2-2">Configuración</el-menu-item>
            <hr>
              <el-menu-item index="2-3">Cerrar Sesión</el-menu-item>
            </el-sub-menu>	
          </el-row>
        </el-col>
        <el-col v-if="authStore.authenticated" :xs="14" :sm="14" :md="0" :lg="0" :xl="0">
          <el-row justify="end">
            <el-sub-menu index="3">
              <template #title><span class="mobile-icon">Menu</span></template>
              <el-menu-item index="1">Dashboard</el-menu-item>
              <el-menu-item index="2-2">Configuración</el-menu-item>
              <hr>
              <el-menu-item index="2-3">Cerrar Sesión</el-menu-item>
            </el-sub-menu>	
          </el-row>
        </el-col>
      </el-row>
    
    </el-col>
    <el-col v-if="!authStore.authenticated && !currentRoute" class="session-button" :xs="6" :sm="4">
      <el-button type="primary" plain class="log-in" @click="redirectTo('Login')"> Ingresar </el-button>
    </el-col>
    <el-col v-if="!authStore.authenticated && !currentRoute" class="session-button" :xs="7" :sm="4">
      <el-button type="primary" @click="redirectTo('Register')"> Registrarse </el-button>
    </el-col>

  </el-row>

  </el-menu>
  
</template>

	
<script setup>
	import { useAuthStore } from "../store/authStore";
	import { useRouter } from 'vue-router'
	import { ref, watch } from 'vue'

	const activeIndex = ref('1')
  const router = useRouter();
  const authStore = useAuthStore();
  const redirectTo = (page, meta) => {
    router.push({ name: page , params: meta });
  }
  const currentRoute = ref(false);
  watch(router.currentRoute,(value) => {
    currentRoute.value = ['Login', 'Register'].includes(value.name);
  });
	const handleSelect = async (key) => {
    if (key === '0') {
      redirectTo('Landing', { user: true });
    } else if (key === '1') {
      redirectTo('Home');
    } else if (key === '2-2') {
			redirectTo('Profile');
		} else if (key === '2-3') {
			await authStore.logoutUser();
      redirectTo('Login')
		}
	}	
</script>

<style lang="scss">
.el-menu-item, 
.el-sub-menu,
.el-sub-menu__title {
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
  min-width: 80px;
  padding: 0px 2%;
  .is-active, &:hover, &:focus{
    background-color: white !important;
  }
}
.main-menu {
  width:100%;
  padding: 10px 20px;
  .el-image__inner{
    height: 50px;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .session-button{
    padding: 10px;
    padding-top: 15px;
    .log-in{
      border: 2px solid #409eff;
      font-weight: 700;
    }
  }
  .mobile-icon{
    font-size:20px;
    margin-right: 40px;
  }

}
</style>