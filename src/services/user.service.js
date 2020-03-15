import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/blog/users/'

class UserService {
	getAllUsers(){
		return axios.get(API_URL, {headers: authHeader()}).then(response => {
			return response.data;
		});
	}

	getUser(userId){
		return axios.get(API_URL + userId, {headers: authHeader()}).then(response => {
			return response.date;
		});
	}

	deleteUser(userId){
		return axios.delete(API_URL + userId, {headers: authHeader()});
	}
}

export default new UserService();