<template>
    <b-container>
        <!-- Upload new file -->
        <div style="margin-bottom: 20px;">
            <b-form-file
                v-model="upload"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                @change="addFile"
            >    
            </b-form-file>
        </div>

        <!-- Files Configuration -->
        <b-table striped hover v-if="this.folder && this.folder.files && this.folder.files.length > 0" :items="this.folder.files" :fields="fieldsFolder">
            <template class="text-right" left v-slot:cell(Actions)="row">
                <b-button variant="danger" size="sm" @click.prevent="deleteFile(row.item)" class="mr-2">
                    <font-awesome-icon icon="trash-alt"/>
                </b-button>
            </template>
        </b-table>

    </b-container>
</template>

<script>

import FileService from '../../../services/folder/file.service';

export default{
    name: 'UploadFile',
    props: ['folder'],
    data(){
        return{
            upload: null,
            fieldsFolder: ["name", "url", "Actions"],
        }
    },
    methods:{
        addFile(event){
            if(event){
                // Retrieve file and put it into FormData Object
                let file = event.target.files[0]
                let formData = new FormData();
                formData.append('upload', file);

                //Call FileService to upload the file and refresh the architecture
                FileService.addFile(formData, this.folder.path).then(() => {
                    this.$emit('refresh', this.folder.path)
                });
            }
        },

        deleteFile(fileDto){
            FileService.deleteFile(fileDto).then(() => {
                this.$emit('refresh', this.folder.path)
            });
        }
    }

}
    
</script>