<template>
	<div>
		<b-container>
			<b-card-group deck>
				<b-row v-for="article in articles" v-bind:key="article.id">
					<b-col>
						<b-card  no-body class="overflow-hidden">
							<b-row no-gutters>
								<b-col md="6">
									<b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
								</b-col>
								<b-col md="6">
									<b-card-body :title="article.title">
										<b-card-text class="small text-muted">Écrit par {{article.username}}, le {{article.releaseDate}}</b-card-text>
										<b-card-text>
											{{article.content}}
										</b-card-text>
									</b-card-body>
								</b-col>
							</b-row>
						</b-card>
					</b-col>
					<br>
				</b-row>
			</b-card-group>
		</b-container>
	</div>
</template>

<script>

import ArticleService from '../../services/article/article.service';

export default{
	name: 'ArticleList',
	computed: {
		currentUser(){
			return this.$store.state.auth.user;
		}
	},
	data(){
		return{
			articles: []	
		}
	},
	mounted(){
		ArticleService.getAllArticles().then(
			response => {
				console.log(response);
				this.articles = response;
			}
		)
	}
}

</script>