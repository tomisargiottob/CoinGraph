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
      throw new Error(error.response.data.message);
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
    const { data } = await this.client.get(`/users/${userId}/apiKey`);
    return data;
  }
  
  async addApiKey(userId, apiKey) {
    const { data } = await this.client.post(`/users/${userId}/apiKey`, apiKey);
    console.log(data);
    return data;
  }

  async removeApiKey(userId, apiKey) {
    const { data } = await this.client.delete(`/users/${userId}/apiKey/${apiKey}`);
    return data;
  }
}

export default new CoinMarketer();
