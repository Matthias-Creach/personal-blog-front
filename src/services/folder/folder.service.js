import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/blog/folders/';

class FolderService{

	getRootFolder(){
		return axios
			.get(API_URL + 'root/', { headers: authHeader()})
			.then(response => { return response.data; });
	}

	getFolder(path){
		return axios
			.get(API_URL + "?path=" + path, {headers: authHeader()})
			.then(response => {	return response.data; });
	}

	addFolder(newFolder){
		return axios
			.post(API_URL, newFolder, {headers: authHeader()}
		);
	}

	deleteFolder(path, forced){
		return axios
			.delete(API_URL + "?path=" + path + "&forced=" + forced, {headers: authHeader()});
	}

}

export default new FolderService();