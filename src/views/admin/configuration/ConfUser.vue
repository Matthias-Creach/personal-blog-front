<template>
    <!-- User configuration -->
    <b-table striped hover :items="users" :fields="fields">
        <template class="text-right" left v-slot:cell(Actions)="row">
            <b-button variant="primary" size="sm" class="mr-2">
                <font-awesome-icon icon="edit"/>
            </b-button>
            <b-button :disabled="row.item.id == currentUser.id" variant="danger" size="sm" @click.prevent="deleteUser(row.item)" class="mr-2">
                <font-awesome-icon icon="trash-alt"/>
            </b-button>
        </template>
    </b-table>
</template>

<script>

import UserService from '../../../services/user.service'

export default{
	name: 'ConfUser', 
	data(){
		return{
			users: [],
			fields: ["id", "username", "email", "Actions"],
		}
	}, 
	mounted(){
        UserService.getAllUsers().then(response => {
            this.users = response;
        });
	},
    computed: {
        currentUser(){
            return this.$store.state.auth.user;
        }
    },
	methods:{
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
	}

}
	
</script>