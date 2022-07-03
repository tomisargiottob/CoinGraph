import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import { useAuthStore } from './authStore';
import client from '../services/client';

export const useWalletStore = defineStore("WalletStore", {
	state: () => {
		return {
			wallets: [],
      currentWallet: {}
		}
	},
	actions: {
		async getWallets(from, to) {
      const userStore = useUserStore();
      if(!from || !to) {
        from = new Date();
        from.setMonth(from.getMonth()-3);
        to = new Date();
      }
      if (!Object.keys(userStore.user).length) {
        const user = JSON.parse(localStorage.getItem('user'));
        userStore.user = user
      }
      try {
        this.wallets = await client.getWallets(userStore.user.id, from, to);
      } catch (err) {
        const authStore = useAuthStore();
        authStore.logoutUser();
      }
      if (this.wallets.length) {
        this.currentWallet = this.wallets[this.wallets.length -1]
      }
    },
    showWallet(id) {
      this.currentWallet = this.wallets.find((wallet) => wallet._id === id);
    }
	}
})
