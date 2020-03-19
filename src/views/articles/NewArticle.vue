<template>
  <b-container>
    <h3>New article</h3>
    <hr>

    <b-form class="container-padding" @submit="onSubmit" @reset="onReset" v-if="show">

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
                        <b-button v-if="this.process == 2" @click.prevent="previousProcess()" variant="primary">Previous</b-button>
                    </div>
                </b-col>
                <b-col>
                    <div class="text-right">
                        <b-button v-if="this.process == 1" @click.prevent="nextProcess()" variant="primary">Next</b-button>
                        <b-button v-if="this.process == 2" type="submit" class="personal-marge" variant="primary">Submit</b-button>
                        <b-button v-if="this.process == 2" type="reset"  class="personal-marge" variant="danger">Reset</b-button>
                    </div>    
                </b-col>
            </b-row>
            
            
        </b-container>
    </footer>

</b-container>



</template>

<script>
  import Article from '../../models/article'
  import Folder  from '../../models/folder'
  
  import ArticleService from '../../services/article/article.service'
  import FolderService  from '../../services/folder/folder.service'

  import ClassicEditor     from '@ckeditor/ckeditor5-build-classic';
  import PersonalFormGroup from '../PersonalFormGroup.vue' 

  export default {
    name: 'NewArticle',
    components: {
      PersonalFormGroup
    },
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        }
    },
    data() {
      return {
      show: true,
      title: '',
      article: new Article('Titre test', 'Contenu test', 'false', ''),

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
watch:{
    title: function(newTitle){ 
        this.editorConfig.simpleUpload.uploadUrl = 'http://localhost:8080/blog/files/?path=articles/' + newTitle + '/'
    }
},
methods: {

    previousProcess(){
        this.process--;
        FolderService.deleteFolder('articles/' + this.title + '/').then(() => {
          console.log("Delete folder ok");
        });
    },
    nextProcess(){
        this.process++;
        //Create Folder
        let folder = new Folder(this.title, 'articles/', null)
        FolderService.addFolder(folder, 'articles/').then(() => {
          console.log("Add folder ok");
        });

    },

  onSubmit() {
    ArticleService.addArticle(this.article, "1").then(response => {
      console.log(response)
        this.$router.push('/home')
    });
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

</style>