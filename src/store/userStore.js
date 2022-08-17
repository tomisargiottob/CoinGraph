import { defineStore } from 'pinia';
import client from '../services/client';

export const useUserStore = defineStore("UserStore", {
	state: () => {
		return {
			user: {},
			apiKeys: [],
      staticCryptos: [],
		}
	},
	actions: {
    async getApiKeys() {
      this.apiKeys = await client.getApiKeys(this.user.id);
    },
    async addApiKey(apiKey) {
      await client.addApiKey(this.user.id, apiKey);
      await this.getApiKeys();
    },
    async removeApiKey(apiKey) {
      await client.removeApiKey(this.user.id, apiKey);
      await this.getApiKeys();
    },
    async enableApiKey(apiKey) {
      await client.enableApiKey(this.user.id, apiKey);
      await this.getApiKeys();
    },
    async disableApiKey(apiKey) {
      await client.disableApiKey(this.user.id, apiKey);
      await this.getApiKeys();  
    },
    async getStaticCryptos() {
      const userStaticCryptos = await client.getStaticCryptos(this.user.id);
      this.staticCryptos = userStaticCryptos.map((crypto) => {
        const registryDate = new Date(crypto.createdAt);
        crypto.formatedDate = `${registryDate.getDate()}-${registryDate.getMonth()}-${registryDate.getFullYear()}`;
        return crypto;
      })
    },
    async addStaticCrypto(crypto) {
      await client.addStaticCrypto(this.user.id, crypto);
      await this.getStaticCryptos();
    },
    async editStaticCrypto(crypto) {
      await client.editStaticCrypto(this.user.id, crypto);
      await this.getStaticCryptos();
    },
    async removeStaticCrypto(cryptoId) {
      await client.removeStaticCrypto(this.user.id, cryptoId);
      await this.getStaticCryptos();
    },
	}
})

