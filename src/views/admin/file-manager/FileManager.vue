<template>

    <b-container>
        <b-breadcrumb>
            <b-breadcrumb-item
                v-for="(section, index) in sections"
                :key="`breadcrumbItem-${index}`"
                @click.prevent="goTo(index)"
            >
                {{ section }}
            </b-breadcrumb-item>

            <b-button variant="primary" size="sm" class="mr-2 text-right" v-b-modal.modal-prevent-closing>
                <font-awesome-icon icon="folder-plus"/>
            </b-button>
        </b-breadcrumb>

        <PersonalTreeMenu
            v-for="child in folder.children"
            v-bind:key="child.name"
            :nodes="child.children"
            :name="child.name"
            :path="child.path"
            :depth="0"

            v-on:refresh="refreshArchitecture($event)"
            v-on:delete="deleteFolder($event)"
            v-on:add="addFolder($event)"
        >
        </PersonalTreeMenu>

        <UploadFile
            :folder="this.folder"
            v-on:refresh="refreshArchitecture($event)"
        >
        </UploadFile>

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
    </b-container>
    
</template>

<script>

import UploadFile from './UploadFile.vue';
import PersonalTreeMenu from './PersonalTreeMenu.vue';

import FolderService  from '../../../services/folder/folder.service';
import Folder         from '../../../models/folder'

export default{
    name: 'FileManager',
    components:{
        UploadFile,
        PersonalTreeMenu,
    },
    data(){
        return{
            folder: [],
            sections: [],
            newFolder: '',
        }
    },
    mounted(){
        FolderService.getFolder('images/').then(response => {
            this.folder = response;
        });
    },
    methods:{
                /** Folder configuration **/

        refreshArchitecture: function(pathFolder){
            FolderService.getFolder(pathFolder).then(response => {
                this.folder  = response;
                this.sections = response.path.split('/')
            });
        },

        addFolder(name){
            let folder = new Folder(name, this.folder.path, null)
            FolderService.addFolder(folder, this.folder.path).then(() => {
                this.refreshArchitecture(this.folder.path);
            });
        },

        deleteFolder(n){
            FolderService.deleteFolder(n).then(() => {
                this.refreshArchitecture(this.folder.path);
            });
        },

        goTo(index){
            let loadPath = '';
            if(index <= this.sections.length){
                for(let i = 0 ; i <= index ; i++){
                    loadPath += this.sections[i] + '/';
                }
                this.refreshArchitecture(loadPath);    
            }
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
        }
    }
}
</script>