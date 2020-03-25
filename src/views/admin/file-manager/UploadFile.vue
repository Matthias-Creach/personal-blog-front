<template>
    <b-container>
        
        <PersonalUpload 
            :path="this.folder.path"
            v-on:upload="$emit('refresh', folder.path)"
        />

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

import PersonalUpload from '../../upload/PersonalUpload';
import FileService from '../../../services/folder/file.service';

export default{
    name: 'UploadFile',
    components:{
        PersonalUpload
    },
    props: ['folder'],
    data(){
        return{
            fieldsFolder: ["name", "url", "Actions"]
        }
    },
    methods:{

        deleteFile(fileDto){
            FileService.deleteFile(fileDto).then(() => {
                this.$emit('refresh', this.folder.path)
            });
        }
    }

}
    
</script>