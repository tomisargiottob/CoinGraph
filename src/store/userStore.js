import { defineStore } from 'pinia';
import client from '../services/client';

export const useUserStore = defineStore("UserStore", {
	state: () => {
		return {
			user: {},
			apiKeys: [],
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
    }
	}
})

