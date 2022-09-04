import Home from '../views/HomePage.vue'
import Landing from '../views/LandingPage.vue'
import Profile from '../views/UserProfile.vue'
import Login from '../views/LoginPage.vue'
// import Register from '../views/RegisterPage.vue'


import { useAuthStore } from '../store/authStore';

import { createRouter, createMemoryHistory } from 'vue-router';

const routes = [
	{ path: '/', name: 'Landing', component: Landing },
	{ path: '/dashboard', name: 'Home', component: Home },
	{ path: '/login', name: 'Login', component: Login},
	{ path: '/profile', name: 'Profile', component: Profile},
	{ path: '/register', name: 'Register', component: Login, meta: { show:'register' }}

]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
	const publicPages = ['/login', '/register'];
  const authData = useAuthStore();
  if(to.path === '/') {
    authData.recoverUserData();
    if (authData.authenticated && !to.params.user) {
      return next('/dashboard');
    }
    return next();
  }
	const authRequired = !publicPages.includes(to.path);
	if (authRequired && !authData.authenticated) {
		return next('/login');
	}
	next();
 })
