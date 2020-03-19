<template>
    <div id="admin">

        <b-container>
            <b-row>
                <b-col class="text-left">
                    <h3>Admin panel</h3>
                </b-col>
                <b-col class="text-right">
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
                <b-breadcrumb>
                    <b-breadcrumb-item
                        v-for="(item, index) in breadcrumbItems"
                        :key="`breadcrumbItem-${index}`"
                        @click.prevent="refreshArchitecture('images/')"
                    >
                        {{ item }}
                    </b-breadcrumb-item>

                    <b-button variant="primary" size="sm" class="mr-2 text-right" v-b-modal.modal-prevent-closing>
                        <font-awesome-icon icon="folder-plus"/>
                    </b-button>
                </b-breadcrumb>

                <div style="margin-bottom: 20px;">
                    <b-form-file
                    v-model="picture"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    @change="addFile"
                >    
                </b-form-file>
                </div>

                <!-- Files Configuration -->
                <b-table striped hover :items="folders.files" :fields="fieldsFolder">
                    <template class="text-right" left v-slot:cell(Actions)="row">
                        <b-button variant="danger" size="sm" @click.prevent="deleteFile(row.item)" class="mr-2">
                            <font-awesome-icon icon="trash-alt"/>
                        </b-button>
                    </template>
                </b-table>

                <PersonalTreeMenu
                    v-for="folder in folders.children"
                    v-bind:key="folder.name"
                    :nodes="folder.children"
                    :name="folder.name"
                    :path="folder.path"
                    :depth="0"

                    v-on:refresh="refreshArchitecture($event)"
                    v-on:delete="deleteFolder($event)"
                    v-on:add="addFolder($event)"
                >
                </PersonalTreeMenu>

                <!-- Upload file -->
            </b-tab>

            <!-- User configuration -->
            <b-tab title="Users">
                <b-table striped hover :items="users" :fields="fieldsUser">
                    <template class="text-right" left v-slot:cell(Actions)="row">
                        <b-button variant="primary" size="sm" class="mr-2">
                            <font-awesome-icon icon="edit"/>
                        </b-button>
                        <b-button :disabled="row.item.id == currentUser.id" variant="danger" size="sm" @click.prevent="deleteUser(row.item)" class="mr-2">
                            <font-awesome-icon icon="trash-alt"/>
                        </b-button>
                    </template>
                </b-table>
            </b-tab>
        </b-tabs>

        <!-- Modal to add new folder -->
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Enter new folder"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    label="Folder"
                    label-for="folder-input"
                >
                    <b-form-input
                        id="name-input"
                        v-model="newFolder"
                        required
                    >
                    </b-form-input>    
                </b-form-group>
            </form>
        </b-modal>

    </div>
</template>

<script>
import ArticleService from '../../services/article/article.service';
import FolderService  from '../../services/folder/folder.service';
import UserService    from '../../services/user.service';
import FileService    from '../../services/folder/file.service';

import Folder         from '../../models/folder'

import PersonalTreeMenu    from '../PersonalTreeMenu.vue';

export default{
    name:'Admin',
    components:{
        PersonalTreeMenu
    },
    data(){
        return{

            fields: ["id", "title", "username", "releaseDate", "Actions"],
            articles: [],
            breadcrumbItems: [],

            fieldsUser: ["id", "username", "email", "Actions"],
            users: [],

            activePathFolder: 'images/',
            newFolder: '',
            activeFolder: null,
            fieldsFolder: ["name", "url", "Actions"],
            folders: [],

            picture: null,
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

        FolderService.getFolder("images/").then(response => {
            this.folders = response;
            this.breadcrumbItems = response.path.split('/')
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
        },

        /** Folder configuration **/

        refreshArchitecture: function(pathFolder){
            this.activePathFolder = pathFolder
            FolderService.getFolder(pathFolder).then(response => {
                this.folders = response;
                this.breadcrumbItems = response.path.split('/')
            });
        },

        addFolder(name){
            let folder = new Folder(name, this.activePathFolder, null)
            FolderService.addFolder(folder, this.activePathFolder).then(() => {
                this.refreshArchitecture(this.activePathFolder);
            });
        },

        deleteFolder(n){
            FolderService.deleteFolder(n).then(() => {
                this.refreshArchitecture(this.activePathFolder);
            });
        },

        /* Modal function */

        resetModal() {
            this.newFolder = ''
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            // Push the name to submitted names
            this.addFolder(this.newFolder)
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },

        /** File configuration **/

        addFile(event){
            if(event){
                // Retrieve file and put it into FormData Object
                let file = event.target.files[0]
                let formData = new FormData();
                formData.append('upload', file);

                //Call FileService to upload the file and refresh the architecture
                FileService.addFile(formData, this.activePathFolder).then(() => {
                    this.refreshArchitecture(this.activePathFolder);
                });
            }
        },

        deleteFile(fileDto){
            FileService.deleteFile(fileDto).then(() => {
                this.refreshArchitecture(this.activePathFolder);
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