import axios from 'axios';

class CoinMarketer {
	constructor() {
		this.client = axios.create({
			baseURL: import.meta.env.VITE_COINMARKETER_ENDPOINT,
			timeout: 30000,
		});
		this.client.interceptors.request.use(function (config) {
			const token = localStorage.getItem('x-access-token');
			config.headers['x-access-token'] = token;
			return config;
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

	async register(username, password) {
		const { data: user } = await this.client.post('/users', { username, password });
		return user;
	}

  async getWallets(userId, from, to) {
    const filter = `where[createdAt][gt]=${Date.parse(from)}&where[createdAt][lt]=${Date.parse(to)}`
    const { data } = await this.client.get(`/users/${userId}/wallet?${filter}`);
		return data;
  }
}

export default new CoinMarketer();
