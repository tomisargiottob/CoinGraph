import Home from '../views/HomePage.vue'
import Profile from '../views/UserProfile.vue'
import Login from '../views/LoginPage.vue'
// import Register from '../views/RegisterPage.vue'


import { useAuthStore } from '../store/authStore';

import { createRouter, createMemoryHistory } from 'vue-router';

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/login', name: 'Login', component: Login, meta: { hideNavbar: true }},
	{ path: '/profile', name: 'Profile', component: Profile},
	{ path: '/register', name: 'Register', component: Login, meta: { hideNavbar: true} , params: { name: 'register' },}

]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const publicPages = ['/login', '/register'];
	const authRequired = !publicPages.includes(to.path);
	const authData = useAuthStore();
	if (authRequired && !authData.authenticated) {
		return next('/login');
	}
	next();
 })
