import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

axios.defaults.withCredentials = true;
class Auth {
	authenticated: boolean;
	accessToken: string;
	refreshToken: string;
	constructor() {
		this.authenticated = false;
		this.accessToken = '';
		this.refreshToken = '';
	}

	isAuthenticated() {
		this.accessToken = cookies.get('authSession');
		const refreshToken = cookies.get('refreshTokenID');
		this.refreshToken = cookies.get('refreshToken');
		if (!this.accessToken && !refreshToken) {
			return (this.authenticated = false);
		}
		if (this.accessToken && refreshToken) {
			return (this.authenticated = true);
		}
		if (!this.accessToken && refreshToken) {
			axios
				.post('http://localhost:8888/refresh', {
					withCredentials: true,
				})
				.then(function (res) {
					console.log(res.data);

					window.location.reload();
				})
				.catch(function (error) {
					console.log(error.response);
				});
		}
	}
}

export default new Auth();
