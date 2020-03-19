import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/blog/folders/';

class FolderService{

	getFolder(path){
		return axios
			.get(API_URL + "?path=" + path, 
			{
				headers: authHeader()
			}

		).then(response => {
			return response.data;
		});
	}

	addFolder(folder, parentPath){
		return axios
			.post(API_URL + "?parentPath=" + parentPath, folder, 
			{
				headers: authHeader()
			}
		);
	}

	deleteFolder(path){
		return axios
			.delete(API_URL + "?path=" + path,
			{
				headers: authHeader()
			}
		);
	}

}

export default new FolderService();