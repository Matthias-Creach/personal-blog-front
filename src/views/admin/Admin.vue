<template>
	<div id="admin">

		<b-container>
			<b-row>
				<b-col class="text-left">
					<h3>Admin panel</h3>
				</b-col>
				<b-col class="text-right">
					<b-button class="space" variant="outline-primary" to="/new-article">Add photograph</b-button>
					<b-button variant="outline-primary" to="/new-article">Add article</b-button>
				</b-col>
			</b-row>
		</b-container>
		<br>

		<b-tabs content-class="mt-3" justified>

			<!-- Article configuration -->
			<b-tab title="Articles" active>
				<b-table striped hover :items="articles" :fields="fields">
					<template class="text-right" left v-slot:cell(Actions)="row">
						<b-button variant="primary" size="sm" class="mr-2" :to="{ name: 'article', params: {id: row.item.id} }">
							<font-awesome-icon icon="eye"/>
						</b-button>
						<b-button variant="primary" size="sm" @click="row.toggleDetails" class="mr-2">
							<font-awesome-icon icon="edit"/>
						</b-button>
						<b-button variant="danger" size="sm" @click.prevent="deleteArticle(row.item)" class="mr-2">
							<font-awesome-icon icon="trash-alt"/>
						</b-button>
					</template>
				</b-table>
			</b-tab>

			<!-- Photographs configuration -->
			<b-tab title="Photographs">
				<h3>TODO...</h3>
			</b-tab>

			<!-- User configuration -->
			<b-tab title="Users">
				<b-table striped hover :items="users" :fields="fieldsUser">
					<template class="text-right" left v-slot:cell(Actions)="row">
						<b-button variant="primary" size="sm" class="mr-2" :to="{ name: 'user', params: {id: row.item.id} }">
							<font-awesome-icon icon="edit"/>
						</b-button>
						<b-button :disabled="row.item.id == currentUser.id" variant="danger" size="sm" @click.prevent="deleteUser(row.item)" class="mr-2">
							<font-awesome-icon icon="trash-alt"/>
						</b-button>
					</template>
				</b-table>
			</b-tab>
		</b-tabs>
	</div>
</template>

<script>

import ArticleService from '../../services/article/article.service';
import UserService    from '../../services/user.service';

export default{
	name:'Admin', 
	data(){
		return{
			fields: ["id", "title", "username", "releaseDate", "Actions"],
			articles: [],

			fieldsUser: ["id", "username", "email", "Actions"],
			users: [],
		}
	},
	computed: {
		currentUser(){
			return this.$store.state.auth.user;
		}
	},
	mounted(){
		ArticleService.getAllArticles().then(response => {
			this.articles = response;
		});
		UserService.getAllUsers().then(response => {
			this.users = response;
		});
	},
	methods: {
		deleteArticle(article) {
			this.$bvModal.msgBoxConfirm('Warning: are you sure to delete this article? ')
			.then(value => {
				if(value){
					ArticleService.deleteArticle(article.id)
					.then(() => {
						this.articles.pop(article);	
					});	
				}
			})
			.catch(err => {
				console.log(err);
			})
		},

		deleteUser(user){
			this.$bvModal.msgBoxConfirm('Warning, are you sure to delete this user?')
			.then(value => {
				if(value){
					UserService.deleteUser(user.id).then(() => {
						this.users.pop(user);
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
		}
	}
}

</script>

<style>
	.space{
		margin-left: 5px;
		margin-right: 5px;
	}
</style>