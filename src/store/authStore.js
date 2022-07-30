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
    saveUserData(user) {
      const userStore = useUserStore();
      userStore.user = user;
      sessionStorage.setItem('x-access-token', user.token );
      sessionStorage.setItem('user', JSON.stringify(user));
      this.authenticated = true;
    },

		async loginUser({ username, password }) {
			try {
				const user = await client.login(username, password);
        this.saveUserData(user);
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
			sessionStorage.removeItem('x-access-token');
      sessionStorage.removeItem('user');
		},

		async registerUser(userData) {
			try {
				const user = await client.register(userData);
        this.saveUserData(user);
				return user;
			} catch (error) {
				console.error('Login failed', error.message);
				throw error;
			}
		}
	}
})

