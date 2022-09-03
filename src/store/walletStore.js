import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import { useAuthStore } from './authStore';
import client from '../services/client';

export const useWalletStore = defineStore("WalletStore", {
	state: () => {
		return {
			wallets: [],
      currentWallet: {},
      lastWallet: {},
      loadingWallets: true,
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
        if(!this.lastWallet.createdAt || this.lastWallet.createdAt < this.wallets[this.wallets.length -1 ].createdAt ) {
          this.lastWallet = this.wallets[this.wallets.length -1 ]
          this.calculateWalletGlobals(this.lastWallet);
        }
        this.currentWallet = this.wallets[this.wallets.length -1];
        this.calculateWalletGlobals(this.currentWallet);
        this.currentWallet.currentFocus = this.currentWallet.globalPosition;
        this.currentWallet.currentFocus.value = this.currentWallet.totalValue;
      }
      this.loadingWallets = false;
    },
    calculateWalletGlobals(wallet) {
      const acumulatedCryptos = {};
      if(wallet && !wallet.globalPosition) {
        for (const account of wallet.accounts) {
          for (const crypto of account.assets) {
            if(!acumulatedCryptos[crypto.coin]) {
              acumulatedCryptos[crypto.coin] = { ...crypto };
            } else {
              acumulatedCryptos[crypto.coin].amount += +crypto.amount;
              acumulatedCryptos[crypto.coin].value += +crypto.value;
            }
          }
        }
        wallet.globalPosition = {};
        wallet.globalPosition.assets = Object.keys(acumulatedCryptos).reduce((fileredCryptos, crypto) => {
          const cryptoValue = acumulatedCryptos[crypto].amount * acumulatedCryptos[crypto].value;
          if (cryptoValue > 10) {
            fileredCryptos.push(acumulatedCryptos[crypto]);
          }
          if(cryptoValue > (wallet.cryptoWeight || 0)) {
            wallet.cryptoWeight = acumulatedCryptos[crypto].coin;
          }
          return fileredCryptos;
        }, [])
      }
    },
    showAccount(id, type) {
      if (id && type) {
        this.currentWallet = this.wallets.find((wallet) => wallet._id === id);
        if (!this.currentWallet.globalPosition) {
          this.calculateWalletGlobals(this.currentWallet);
        }
        if (type === 'global') {
          this.currentWallet.currentFocus = this.currentWallet.globalPosition;
        } else {
          this.currentWallet.currentFocus = this.currentWallet.accounts.find((walletAccount) => walletAccount.account === type);
        }
      }
    }
	},
  getters: {
    walletValue: (state) => Math.round(state.lastWallet?.totalValue) || 0,
    cryptoAmount: (state) => state.lastWallet?.globalPosition?.assets?.length || 0,
    cryptoWeight: (state) => state.lastWallet?.cryptoWeight || '-',
  },
})
