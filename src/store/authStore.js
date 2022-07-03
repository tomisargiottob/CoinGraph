import { defineStore } from 'pinia';
import client from '../services/client'
import { useUserStore } from './userStore';

export const useAuthStore = defineStore("AuthStore", {
	state: () => {
		return {
			authenticated: false,
		}
	},
	actions: {

		setAuthenticated() {
			this.authenticated = true;
		},

		async loginUser({ username, password }) {
			try {
				const user = await client.login(username, password);
        const userStore = useUserStore();
        userStore.user = user;
				localStorage.setItem('x-access-token', user.token );
        localStorage.setItem('user', JSON.stringify(user));
				this.authenticated = true;
        
				return user;
			} catch (error) {
				console.error('Login failed', error.message);
				throw error;
			}
		},

		async logoutUser() {
			this.authenticated = false;
      try {
        await client.logout();
      } catch (err) {
        console.log('token has expired');
      }
			localStorage.removeItem('x-access-token');
      localStorage.removeItem('user');
		},

		async registerUser({username, password}) {
			try {
				const user = await client.register(username, password);
				localStorage.setItem('x-access-token', user.token );
				this.authenticated = true;
				return user;
			} catch (error) {
				console.error('Login failed', error.message);
				throw error;
			}
		}
	}
})

