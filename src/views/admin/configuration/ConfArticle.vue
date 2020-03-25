<template>
        
    <!-- Article configuration -->
    <b-table striped hover :items="articles" :fields="fields">
        <template class="text-right" left v-slot:cell(Actions)="row">
            <b-button variant="primary" size="sm" class="mr-2" :to="{ name: 'article', params: {id: row.item.id} }">
                <font-awesome-icon icon="eye"/>
            </b-button>
            <b-button variant="primary" size="sm" :to="{ name: 'edit-article', params: {id: row.item.id} }" class="mr-2">
                <font-awesome-icon icon="edit"/>
            </b-button>
            <b-button variant="danger" size="sm" @click.prevent="deleteArticle(row.item)" class="mr-2">
                <font-awesome-icon icon="trash-alt"/>
            </b-button>
        </template>
    </b-table>

</template>

<script>

//import Article        from '../../../models/article'
import ArticleService from '../../../services/article/article.service';	

export default{
	name: 'ConfArticle',
	data(){
		return{
			articles: [],
			fields: ["id", "title", "username", "releaseDate", "Actions"],
		}
	},
	mounted(){
		//Get list of Articles
		ArticleService.getAllArticles().then(reponse => {
			this.articles = reponse;
		});

	},
	methods:{
        deleteArticle(article) {
            this.$bvModal.msgBoxConfirm('Warning: are you sure to delete this article? ').then(value => {
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
        }
	}
}


</script>