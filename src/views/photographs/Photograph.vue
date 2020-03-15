<template>
    
    <b-container>
        <h3>Photographs</h3>
        <hr>
        
        <b-row class="text-center">
            <b-col lg="4" v-for="photo in photographs" v-bind:key="photo.key">
                <b-img thumbnail :src="photo.url" fluid alt="Responsive image"></b-img>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import PhotographService from '../../services/photograph/photograph.service';
export default{
    name: 'Photograph',
    data(){
        return{
            urlS3: 'https://blog-manon.s3.eu-west-3.amazonaws.com/',
            photographs: [],
        }
    },
    mounted(){
        PhotographService.getAllPhotographs().then(response => {
            this.photographs = response;
            console.log(response);
        });
    },
    methods:{
        getImage(key){
            console.log(this.urlS3 + key)
            return require(this.urlS3 + key);

        }
    }
}

</script>