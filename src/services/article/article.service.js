import axios from 'axios';
import authHeader from '../auth-header';

const API_URL = 'http://localhost:8080/blog/articles/';

class ArticleService{

	getArticle(articleId){
		return axios
			.get(API_URL + articleId, 
			{
				headers: authHeader()
			}
		);
	}

	getAllArticles(){
		return axios
			.get(API_URL)
			.then(response => {
				if(response.data){
					return response.data;
				}
			});
	}

	addArticle(article, userId){
		return axios
			.post(API_URL + "?userId=" + userId, 
			{
				title: article.title, 
				content: article.content, 
				isPrivate: article.isPrivate,
				releaseDate: new Date()
			}, 
			{
				headers: authHeader()
			}
		);
	}

	deleteArticle(articleId){
		return axios
			.delete(API_URL + articleId,
			{
				headers: authHeader()
			}
		);
	}

	updateArticle(article){
		return axios
			.put(API_URL + article.id, article, {headers: authHeader()})
			.then(response => {return response.data});
	}

}

export default new ArticleService();