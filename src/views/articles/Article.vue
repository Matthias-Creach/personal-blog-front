<template>
	<div>
		<h3>{{article.title}}</h3>
		<div v-html="article.content">
		</div>
	</div>
</template>

<script>

import Article from '../../models/article'
import ArticleService from '../../services/article/article.service';

export default{
	name: 'Article',
	props: ['id'],
	data(){
		return{
			article: new Article(null, '', '', '', '')
		}
	}, 
	mounted(){
		ArticleService.getArticle(this.id).then(response => {
			console.log(response.data)
			this.article = response.data;
		});
	}
}

</script>