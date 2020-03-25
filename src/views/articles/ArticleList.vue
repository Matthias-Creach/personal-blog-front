<template>
    <div>
        <b-container>
            <h3>Articles</h3>
            <hr>
            <b-row>
                <b-col cols="12" md="8">
                    <b-card-group class="max-width" deck>
                        <b-row class="max-width">
                            <b-col cols="12" class="articles" v-for="article in articles" v-bind:key="article.id">
                                <b-card  no-body class="overflow-hidden">
                                    <b-row no-gutters>
                                        <b-col style="overflow: hidden;" cols="4">
                                            <b-img style="max-height: 200px;" :src="s3Url + article.title + '/profile'" rounded alt="Rounded image"></b-img>
                                        </b-col>
                                        <b-col cols="8">
                                            <b-card-body :title="article.title">
                                                <b-card-text class="small text-muted">Écrit par {{article.username}}, le {{article.releaseDate}}</b-card-text>
                                                <b-card-text>
                                                    
                                                </b-card-text>
                                                <b-button class="personal-button" :to="{ name: 'article', params: {id: article.id} }" variant="primary">Read</b-button>
                                            </b-card-body>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-col>
                            <br>
                        </b-row>
                    </b-card-group>
                </b-col>
                <b-col cols="12" md="4">
                    <h6>Thèmes</h6>
                    <hr>
                    <p class="text-center">... TODO ...</p>

                    <br>

                    <h6>Populaires</h6>
                    <hr>
                    <p class="text-center">... TODO ...</p>
                </b-col>
            </b-row>

            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="list-articles"
            >

            </b-pagination>
        </b-container>

        <div v-if="this.loading" id="my-loading">
            <div class="text-center">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
                <br>
                <p>Chargement des données...</p>
            </div>
        </div>

    </div>
</template>

<script>

import ArticleService from '../../services/article/article.service';

export default{
    name: 'ArticleList',
    data(){
        return{
            /* Pagination configuration*/
            currentPage: 1, 
            perPage: 5,

            loading: true,
            loadArticles: [],

            s3Url: 'https://blog-manon.s3.eu-west-3.amazonaws.com/root/articles/'
        }
    },
    computed: {
        articles() {
          const items = this.loadArticles
          // Return just page of items needed
          return items.slice(
            (this.currentPage - 1) * this.perPage,
            this.currentPage * this.perPage
          )
        },
        rows(){
            return this.loadArticles.length
        },

        currentUser(){
            return this.$store.state.auth.user;
        }
    },
    mounted(){
        ArticleService.getAllArticles()
        .then(response => {
            console.log(response);
            this.loadArticles = response;
            this.loading = false
        })
        .catch(error => {
            console.log(error)
            this.$router.push('/error');
        });
    }
}

</script>

<style>

.personal-button{
    background-color: #b8e2ea;
    color: #0c5460;
    border-color: #bee5eb;
    font-weight: 400;
}

.max-width{
    width: 100%;
}

.articles{
    margin-bottom: 10px;
}

#my-loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(117, 152, 190, 0.25);
    z-index: 2000;
    padding-top: 20%;
}

</style>