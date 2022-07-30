import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import { useAuthStore } from './authStore';
import client from '../services/client';

export const useWalletStore = defineStore("WalletStore", {
	state: () => {
		return {
			wallets: [],
      currentWallet: {},
      lastWallet: {}
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
        const user = JSON.parse(sessionStorage.getItem('user'));
        userStore.user = user
      }
      try {
        this.wallets = await client.getWallets(userStore.user.id, from, to);
      } catch (err) {
        console.error(err);
        const authStore = useAuthStore();
        authStore.logoutUser();
      }
      if (this.wallets.length) {
        this.currentWallet = this.wallets[this.wallets.length -1]
      }
      if(!this.lastWallet.createdAt || this.lastWallet.createdAt < this.wallets[this.wallets.length -1 ].createdAt ) {
        this.lastWallet = this.wallets[this.wallets.length -1 ]
        this.lastWallet.amount = this.lastWallet.wallet.assets.reduce((cryptos, asset) => {
          if (asset.value > ( userStore.user.minValue || 10) ) {
            cryptos += 1;
          }
          if (!this.lastWallet.cryptoWeight || this.lastWallet.cryptoWeight < asset.value) {
            this.lastWallet.cryptoWeight = asset.coin;
          }
          return cryptos;
        }, 0);
      }
    },
    showWallet(id) {
      this.currentWallet = this.wallets.find((wallet) => wallet._id === id);
    }
	},
  getters: {
    walletValue: (state) => Math.round(state.lastWallet.wallet.value),
    cryptoAmount: (state) => state.lastWallet.amount,
    cryptoWeight: (state) => state.lastWallet.cryptoWeight,
  },
})
