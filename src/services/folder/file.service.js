import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/blog/files/';

class FileService{

	addFile(upload, path, name){
		return axios
			.post(API_URL + "?path=" + path + (name ? "&name=" + name : ""), upload, {headers: authHeader()})
			.then(response => { return response.data })
	}

	deleteFile(fileDto){
		console.log(fileDto.url)
		return axios
			.delete(API_URL, {
				headers: authHeader(),
				data: fileDto
			});
	}
}

export default new FileService();