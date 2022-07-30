<template>
	<el-menu
	:default-active="activeIndex"
	class="el-menu-demo"
	mode="horizontal"
	:ellipsis="false"
	text-color="black"
	@select="handleSelect"
	>
	<el-menu-item index="0">
		<el-image src="./coinGraphMin.png"/>
	</el-menu-item>
	<div class="flex-grow" />
	<el-menu-item index="1">Dashboard</el-menu-item>
	<el-sub-menu index="2">
      <template #title>Perfil</template>
      <!-- <el-menu-item index="2-1">Información</el-menu-item> -->
      <el-menu-item index="2-2">Configuración</el-menu-item>
		<hr>
      <el-menu-item index="2-3">Cerrar Sesión</el-menu-item>
    </el-sub-menu>	
  </el-menu>
</template>

	
<script setup>
	import { useAuthStore } from "../store/authStore";
	import { useRouter } from 'vue-router'
	import { ref } from 'vue'

	const activeIndex = ref('1')
    const router = useRouter();
    const authStore = useAuthStore();
	const handleSelect = async (key) => {
    if (key === '1') {
       router.push({ name: 'Home' })
    } else if (key === '2-2') {
			router.push({ name: 'Profile' })
		} else if (key === '2-3') {
			await authStore.logoutUser();
      router.push({ name: 'Login' })
		}
	}	
</script>

<style>
.el-image__inner{
	height: 50px;
}
.flex-grow {
  flex-grow: 1;
}
.el-menu-item, 
.el-sub-menu,
.el-sub-menu__title {
	font-size: 1rem;
}
/* .el-menu{
	margin-bottom:20px
} */
</style>