import axios from 'axios';
import { router } from '../router/router'
class CoinMarketer {
	constructor() {
		this.client = axios.create({
			baseURL: import.meta.env.VITE_COINMARKETER_ENDPOINT,
			timeout: 30000,
		});
		this.client.interceptors.request.use(function (config) {
			const token = sessionStorage.getItem('x-access-token');
			config.headers['x-access-token'] = token;
			return config;
		});
    this.client.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response.status === 401) {
        router.push('/login')
      }
      throw error;
    });
	}

	setToken(token) {
		axios.defaults.headers.common['x-access-token'] = token;
	}

	async login(username, password) {
		const { data: user } = await this.client.post('/login', { username, password });
		return user;
	}

	async logout() {
		await this.client.post('/logout');
		this.client.headers = {};
	}

	async register(userData) {
		const { data: user } = await this.client.post('/users',userData);
		return user;
	}

  async getWallets(userId, from, to) {
    const filter = `where[createdAt][gt]=${Date.parse(from)}&where[createdAt][lt]=${Date.parse(to)}`
    const { data } = await this.client.get(`/users/${userId}/wallet?${filter}`);
		return data;
  }

  async getApiKeys(userId) {
    const { data: { apiKeys } } = await this.client.get(`/users/${userId}/apiKey`);
    return apiKeys;
  }
  
  async addApiKey(userId, apiKey) {
    try {
      const { data } = await this.client.post(`/users/${userId}/apiKey`, apiKey);
      console.log(data);
      return data;
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  async removeApiKey(userId, apiKey) {
    const { data } = await this.client.delete(`/users/${userId}/apiKey/${apiKey}`);
    return data;
  }

  async enableApiKey(userId, apiKey) {
    const { data } = await this.client.post(`/users/${userId}/apiKey/${apiKey}/enable`);
    return data;
  }

  async disableApiKey(userId, apiKey) {
    const { data } = await this.client.post(`/users/${userId}/apiKey/${apiKey}/disable`);
    return data;
  }

  async getStaticCryptos(userId) {
    const { data: { staticCryptos } } = await this.client.get(`/users/${userId}/staticCrypto`);
    return staticCryptos;
  }

  async addStaticCrypto(userId, crypto) {
    const cryptoData = {
      asset: crypto.asset,
      amount: +crypto.amount,
      averagePrice: +crypto.averagePrice,
    }
    const { data } = await this.client.post(`/users/${userId}/staticCrypto`, cryptoData);
    return data;
  }

  async removeStaticCrypto(userId, cryptoId) {
    const { data } = await this.client.delete(`/users/${userId}/staticCrypto/${cryptoId}`);
    return data;
  }

  async editStaticCrypto(userId, crypto) {
    const cryptoData = {
      amount: +crypto.amount,
      averagePrice: +crypto.averagePrice,
    }
    const { data } = await this.client.patch(`/users/${userId}/staticCrypto/${crypto.id}`, cryptoData);
    return data;
  }

  async getAvailableCryptos(query) {
    let formatedQuery;
    if (query) {
      formatedQuery = `?where[asset]=${query}`
    }
    const { data: { availableCryptos } } = await this.client.get(`/availableCryptos${formatedQuery}`);
    console.log(query, availableCryptos);
    return availableCryptos;
  }

}

export default new CoinMarketer();
