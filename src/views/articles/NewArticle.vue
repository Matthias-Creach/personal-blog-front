<template>
  <div>
    
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group inline
        id="input-group-title"
        label="Title:"
        label-for="input-1"
      >
          <b-form-input
              id="input-title"
              v-model="article.title"
              type="text"
              required
              placeholder="Enter title"
          >
          </b-form-input>
    </b-form-group>

    <b-form-group 
      id="input-group-2" 
      label="Content:"  
      label-for="input-2"
    >
        <ckeditor 
          id="input-2"
          :editor="editor" 
          v-model="article.content" 
          :config="editorConfig"></ckeditor>
    </b-form-group>

<b-form-group id="input-group-4">
    <b-form-checkbox
        v-model="article.isPrivate"
        unchecked-value="false" 
        value="true"
    >Private ?
    </b-form-checkbox>
</b-form-group>

<b-button type="submit" variant="primary">Submit</b-button>
<b-button type="reset" variant="danger">Reset</b-button>
</b-form>
<b-card class="mt-3" header="Form Data Result">
  <pre class="m-0">{{ article }}</pre>
</b-card>
</div>
</template>

<script>
  import Article from '../../models/article'
  import ArticleService from '../../services/article/article.service'

  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export default {
    name: 'NewArticle',
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        }
    },
    data() {
      return {
      editor: ClassicEditor,
      editorConfig: {
        ckfinder: {
            // Upload the images to the server using the CKFinder QuickUpload command.
            uploadUrl: 'http://localhost:8080/blog/upload/',
            headers:{
              Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5vbiIsImlhdCI6MTU4Mzg2NDk0MCwiZXhwIjoxNTgzOTUxMzQwfQ.s_vzooKHxT3SdbegP-GCngo39MGobMIMGVflljd3O69zMGfyu1GZsMyFcXiwmkbcrwQYS6FhRGUE_oXfP6aRKg'
            }
        }
      },
      show: true,
      article: new Article('Titre test', 'Contenu test', 'false', ''),
  }
},
methods: {
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
}
}
</script>