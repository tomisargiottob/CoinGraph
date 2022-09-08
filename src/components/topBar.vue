<template>
	<el-menu
	:default-active="activeIndex"
	mode="horizontal"
	:ellipsis="false"
	text-color="black"
	@select="handleSelect"
	>
    <el-row class="main-menu"> 
      <el-col v-if="authStore.authenticated" :span="24">
        <el-row justify="start">
          <el-col :span="10">
            <el-menu-item index="0">
              <el-image src="./coinGraphMin.png"/>
            </el-menu-item>
          </el-col>
          <el-col v-if="authStore.authenticated" :xs="0" :sm="0" :md="14" :lg="14" :xl="14">
            <el-row justify="end">
              <toggle-language />
              <el-menu-item index="1">{{ $t('topBar.dashboard') }}</el-menu-item>
              <el-sub-menu index="2">
                <template #title>{{ $t('topBar.profile') }}</template>
                <el-menu-item index="2-2">{{ $t('topBar.configuration') }}</el-menu-item>
              <hr>
                <el-menu-item index="2-3">{{ $t('topBar.closeSesion') }}</el-menu-item>
              </el-sub-menu>	
            </el-row>
          </el-col>
          <el-col v-if="authStore.authenticated" :xs="14" :sm="14" :md="0" :lg="0" :xl="0">
            <el-row justify="end">
              <toggle-language />
              <el-sub-menu index="3">
                <template #title><div class="mobile-icon"><menu-icon /></div></template>
                <el-menu-item index="1">{{ $t('topBar.dashboard') }}</el-menu-item>
                <el-menu-item index="2-2">{{ $t('topBar.configuration') }}</el-menu-item>
                <hr>
                <el-menu-item index="2-3">{{ $t('topBar.closeSesion') }}</el-menu-item>
              </el-sub-menu>	
            </el-row>
          </el-col>
        </el-row>
      
      </el-col>
      <el-col v-if="!authStore.authenticated" class="image-container" :offset="2" :xs="12" :sm="!currentRoute ? 8 : 18" :md="!currentRoute ? 11 : 19" :lg="!currentRoute ? 13 : 20" :xl="!currentRoute ? 16 : 20">
        <el-image src="./coinGraphMin.png" @click="handleSelect('0')"/>
      </el-col>
      <el-col v-if="!authStore.authenticated" :xs="10" :sm="!currentRoute ? 6 : 4" :md="!currentRoute ? 4 : 3" :lg="!currentRoute ? 3 : 2" :xl="2">
        <toggle-language />
      </el-col>
      <el-col v-if="!authStore.authenticated && !currentRoute" class="session-button" :xs="12" :sm="4" :md="3" :lg="3" :xl="2">
        <el-button type="primary" plain class="log-in" @click="redirectTo('Login')"> {{ $t('topBar.logIn') }} </el-button>
      </el-col>
      <el-col v-if="!authStore.authenticated && !currentRoute" class="session-button" :xs="12" :sm="4" :md="4" :lg="3" :xl="2">
        <el-button type="primary" @click="redirectTo('Register')"> {{ $t('topBar.signUp') }} </el-button>
      </el-col>
    </el-row>
  </el-menu>
</template>

	
<script setup>
	import { useAuthStore } from "../store/authStore";
	import { useRouter } from 'vue-router'
	import { ref, watch } from 'vue'
  import toggleLanguage from './toggleLanguage.vue';
  import MenuIcon from 'vue-material-design-icons/Menu.vue';

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
.mobile-icon{
  position:relative;
  top: -15px;
  left: 10px;
}
.image-container{
  img{
    cursor:pointer;
  }
  text-align: left;
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
    button {
      max-width: 180px;
    }
    padding: 10px;
    padding-top: 10px;
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