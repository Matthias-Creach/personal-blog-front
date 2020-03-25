<template>
    
    <b-container fluid class="p-">
        <h3>Photographs</h3>
        <hr>

        <b-row>
            <b-col cols="0" sm="4" >

            <h6>Dossiers</h6>
            <hr>

            <ol class="folder-list" v-if="folders && folders.length > 0">
                <li v-for="folder in folders" :key="folder.name"  @click="loadFiles(folder)">
                    <a v-bind:class="[{ active: folder.name === activeFolder.name }]">{{folder.name}}</a>
                </li>
            </ol>

            </b-col>

            <b-col v-if="activeFolder" class="text-center" cols="12" sm="8">
                <div class="img-container" v-for="file in this.activeFolder.files" :key="file.name">
                    <img class="my-img" :src="file.url" @click="zoomIn(file.url)">
                </div>
            </b-col>

        </b-row> 

        <div v-if="activeUrl" id="img-modal">
            <div id="img-modal-container">
                <img :src="this.activeUrl" @click="activeUrl = null">
            </div>
        </div>
    </b-container>
</template>

<script>

import FolderService from '../../services/folder/folder.service';

export default{
    name: 'Photograph',
    data(){
        return{

            folderPath: 'root/images/',
            folders: [],

            activeFolder: null,
            activeUrl: null,

            urlS3: 'https://blog-manon.s3.eu-west-3.amazonaws.com/',
        }
    },

    mounted(){

        FolderService.getFolder(this.folderPath).then(response => {
            console.log(response)
            this.folders = response.children;
            this.activeFolder = response.children[0];
        });

    },
    methods:{
        getImage(key){
            return require(this.urlS3 + key);
        },

        loadFiles(folder){
            this.activeFolder = folder
        },

        zoomIn(url){
           this.activeUrl = url;
        }
    }
}

</script>

<style>

/* Modal styles */
#img-modal{
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;


    background-color: #b6b6ccab;
    z-index: 3000;
}

#img-modal-container{

    width: 70%;
    height: 90%;

    margin: auto;
    margin-top: 2.5%;

    text-align: center;
}

#img-modal-container img{
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
}

/* Folders list style*/
.folder-list{
    list-style-type: none;
    
}

/* Folders list style*/
.folder-list li a:hover{
    cursor: pointer;
    color: #6c2e43;
    border-bottom: 1px solid #6c2e43;
}

.folder-list li .active{
    color: #6c2e43;
    border-bottom: 1px solid #6c2e43;
    cursor: default;
}

/* Images styles */

.img-container{
    display: inline-block;
    overflow: hidden;
    width: 300px;
    height: 300px;
    margin: 1%;

    border: 1px solid #86737a73;
    background-color: #5d233629;
}

.my-img{
    max-height: 100%;
    margin: auto;
    cursor: pointer;
}

</style>