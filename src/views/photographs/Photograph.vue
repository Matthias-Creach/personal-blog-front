<template>
    
    <b-container fluid class="p-">
        <h3>Photographs</h3>
        <hr>

        <!-- Carousels -->

        <b-carousel
            id="carousel"
            v-model="slideNumber"
            :interval="4000"
            controls
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
        >

            <b-carousel-slide v-for="file in files"  v-bind:key="file.url" :img-src="file.url" class="slide"></b-carousel-slide>

        </b-carousel>

        <!-- Folders -->
        
        <b-row class="text-center">
            <b-col v-for="photo in photographs" v-bind:key="photo.key">
                <b-img thumbnail :src="photo.url" fluid alt="Responsive image"></b-img>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import FolderService     from '../../services/folder/folder.service';

export default{
    name: 'Photograph',
    data(){
        return{
            files: [],

            slideNumber: 0,
            sliding: null,

            urlS3: 'https://blog-manon.s3.eu-west-3.amazonaws.com/',
            carouselFolderUrl: 'images/carousel/',
            photographs: [],
        }
    },

    mounted(){

        FolderService.getFolder(this.carouselFolderUrl).then(response => {
            this.files = response.files;
            console.log(response.files)
        });
    },
    methods:{
        getImage(key){
            return require(this.urlS3 + key);
        },
        onSlideStart() {
            this.sliding = true
        },
        onSlideEnd() {
            this.sliding = false
        }
    }
}

</script>

<style>
#carousel{
    margin: auto;
}

.slide{
    overflow: hidden;

    height: 480px!important;
    width: 480px!important;
}
</style>