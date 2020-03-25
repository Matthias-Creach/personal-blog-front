<template>
  <b-container>
    <h3>New article</h3>
    <hr>

    <b-form class="container-padding"         label-cols-sm="4"
        label-cols-lg="3" @submit="onSubmit" @reset="onReset" v-if="show">

        <!-------------------------------------------------------- Part 1 -------------------------------------------------------->
        <div v-if="this.process == 1">

            <PersonalFormGroup
                label             = "Title"
                v-bind:title.sync = "title"
                type              = "text"
            />

            <b-form-group id="input-group-4">
                <b-form-checkbox
                    v-model="article.isPrivate"
                    unchecked-value="false" 
                    value="true"
                >
                    Private ?
                </b-form-checkbox>
            </b-form-group>

        </div>

        <!-------------------------------------------------------- Part 2 -------------------------------------------------------->
        <div v-if="this.process == 2">
          <b-row>
            <b-col cols="12" sm="3">
             <label>Image</label>
            </b-col>
            <b-col cols="12" sm="9">
              <PersonalUpload
                fileName="profile"
                :path="'root/articles/' + title + '/'"
                @upload="addProfileImg($event)"
              />
            </b-col>
          </b-row>
          <div v-if="profileImgUrl">
              <img class="img-profile" :src="profileImgUrl">
          </div>
        </div>

        <!-------------------------------------------------------- Part 3 -------------------------------------------------------->
        <div v-if="this.process == 3">
            <ckeditor 
                v-model="article.content"
                :editor="editor" 
                :config="editorConfig"
                class="ckeditor-textarea-height">
            </ckeditor>          
        </div>

</b-form>
    
    <!---------------------------------------------------------- FOOTER ---------------------------------------------------------->
    <footer class="footer">
        <b-container>
            <b-row>
                <b-col>
                    <div class="text-left">
                        <b-button v-if="this.process != 1" @click.prevent="previousProcess()" variant="primary">Previous</b-button>
                    </div>
                </b-col>
                <b-col>
                    <div class="text-right">
                        <b-button v-if="this.process != 3" @click.prevent="nextProcess()" variant="primary">Next</b-button>
                        <b-button v-if="this.process == 3" @click.prevent="onSubmit()" class="personal-marge" variant="primary">Submit</b-button>
                        <b-button v-if="this.process == 3" type="reset.prevent"  class="personal-marge" variant="danger">Reset</b-button>
                    </div>    
                </b-col>
            </b-row>
            
        </b-container>
    </footer>

</b-container>



</template>

<script>

  import Article from '../../models/article';
  import Folder  from '../../models/folder';
  
  import ArticleService from '../../services/article/article.service';
  import FolderService  from '../../services/folder/folder.service';

  import PersonalUpload    from '../upload/PersonalUpload';
  import ClassicEditor     from '@ckeditor/ckeditor5-build-classic';
  import PersonalFormGroup from '../PersonalFormGroup.vue';

  export default {
    name: 'NewArticle',
    props: ['id'],
    components: {
      PersonalFormGroup,
      PersonalUpload
    },
    data() {
        return {
            show: true,
            title: '',
            article: new Article(null, 'Titre test', 'Contenu test', 'false', ''),
            profileImgUrl: null,

            process: 1,

            editor: ClassicEditor,

            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                height: 400,
                simpleUpload: {

                    // The URL that the images are uploaded to.
                    uploadUrl: 'http://localhost:8080/blog/upload/articles/',

                    // Headers sent along with the XMLHttpRequest to the upload server.
                    headers: {
                        Authorization: 'Bearer ' + this.$store.state.auth.user.token
                    }
                }
            }
        }
    },
    mounted(){
        if(this.id){
            this.article = ArticleService.getArticle(this.id).then(response => {
                console.log(response.data)
                this.article = response.data;
                this.title   = response.data.title;
                this.process = 2;
                this.profileImgUrl = 'https://blog-manon.s3.eu-west-3.amazonaws.com/root/articles/' + response.data.title + '/profile'
            });
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        }
    },
    watch:{
        title: function(newTitle){ 
            this.editorConfig.simpleUpload.uploadUrl = 'http://localhost:8080/blog/files/?path=root/articles/' + newTitle + '/'
        }
    },
methods: {

    previousProcess(){
        if(this.process == 2){
            FolderService.deleteFolder('root/articles/' + this.title + '/', 1).then(() => {
                this.process--;
                console.log("Delete folder ok");
            });
        }else{
            this.process--;
        }
    },
    
    nextProcess(){
       
       if(this.process == 1){
        //Create Folder
        let folder = new Folder(this.title, null, 'root/articles/', null)
        FolderService.addFolder(folder)
          .then(() => {
            console.log("Add folder ok");
             this.process++;
          })
          .catch(error => {
            console.log("Folder already exists!")
            console.log(error)
          })
        }else{
            this.process++;
        }

    },

    addProfileImg(file){
        console.log(file)
        this.profileImgUrl = file.url;
    },

    onSubmit() {
        this.article.title = this.title;

        if(this.id){
            ArticleService.updateArticle(this.article).then(() => {
                this.$router.push('/articles')
            });
        }else{
             ArticleService.addArticle(this.article, this.currentUser.id).then(response => {
                console.log(response)
                this.$router.push('/articles')
            });
        }
    },
onReset(evt) {
    evt.preventDefault()
        // Reset our form values
        this.article.title   = ''
        this.article.content = ''
        this.article.isPrivate = false
        this.show = false
        this.$nextTick(() => {
          this.show = true
      })
    }

},
}
</script>

<style>
.footer {
    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 55px;

    z-index: 1030;

    padding: 10px;
    background-color: #c8e1e52e
}

.personal-marge{
    margin-left: 10px;
    margin-right: 10px;
}

.container-padding{
    padding-bottom: 80px;
}

.img-profile{
    max-width: 250px;
    max-width: 250px;
}

</style>