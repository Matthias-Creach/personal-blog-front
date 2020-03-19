<template>
    <div class="tree-menu">
        <div v-if="nodes" class="label-wrapper">
            <b-row>
                <b-col>
                    <div  :style="indent">
                        <a href="" @click.prevent="refreshArchitecture(path)">
                            {{name}}
                        </a>
                    </div>
                </b-col>
                <b-col class="text-right">

                    <b-button v-if="nodes.length == 0" variant="danger" size="sm" @click.prevent="deleteFolder(path)" class="mr-2">
                        <font-awesome-icon icon="trash-alt"/>
                    </b-button>

                </b-col>
            </b-row>

            <div v-if="!nodes">
                add
            </div>
            
        </div>

        <PersonalTreeMenu
            v-for="node in nodes"
            v-bind:key="node.name"

            :nodes="node.children"
            :name="node.name"
            :path="node.path"
            :depth="depth+1"

            v-on:refresh="refreshArchitecture($event)"
            v-on:delete="deleteFolder($event)"
            v-on:add="addFolder($event)"
        >
        </PersonalTreeMenu>

    </div>
    
</template>

<script>
    export default{
        name: "PersonalTreeMenu",
        props: ['name', 'path', 'nodes', 'depth'],
        data(){
            return{
                picture: '',
            }
        },
        computed:{
            indent(){
                return {transform: `translate(${this.depth * 50}px)`}
            },
            labelClasses() {
                return { 'has-children': this.nodes }
            },
        },
        methods:{
            refreshArchitecture: function(pathFolder){
                this.$emit('refresh', pathFolder)
            },
            deleteFolder(pathFolder){
                this.$emit('delete', pathFolder)
            },
            addFolder(n){
                this.$emit('add', n)
            },
        }
    }
</script>

<style>

  .label-wrapper {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }


</style>