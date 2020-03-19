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

            <!-- Article Configuration -->
            <b-tab title="Articles" active>
                <ConfArticle/>
            </b-tab>

            <!-- File Manager configuration -->
            <b-tab title="File manager">
                <FileManager>

                </FileManager>
            </b-tab>

            <!-- User configuration -->
            <b-tab title="Users">
                <ConfUser></ConfUser>
            </b-tab>
        </b-tabs>

    </div>
</template>

<script>

import ConfArticle from './configuration/ConfArticle.vue';
import ConfUser    from './configuration/ConfUser.vue';
import FileManager  from './file-manager/FileManager.vue';

export default{
    name:'Admin',
    components:{
        ConfArticle,
        ConfUser,
        FileManager,
    }
}

</script>

<style>
    .space{
        margin-left: 5px;
        margin-right: 5px;
    }
</style>