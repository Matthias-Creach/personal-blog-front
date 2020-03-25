<template>

    <b-container id="app">
        <b-navbar toggleable="lg" type="dark" fixed="top" class="personal-bg">
            <b-navbar-brand to="/"><font-awesome-icon class="color-white" icon="home"/></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item class="color-white" to="/articles">Articles</b-nav-item>
                    <b-nav-item class="color-white" to="/photographs">Photographs</b-nav-item>

                    <!-- About us -->
                    <b-nav-item-dropdown left>
                        <template v-slot:button-content>
                            <em>About us</em>
                        </template>
                        <b-dropdown-item to="/manon">Manon</b-dropdown-item>
                        <b-dropdown-item to="/matthias">Matthias</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <!-- to choose language -->
                    <b-form-select v-model="locale" :options="languages"></b-form-select>

                    <!-- To register -->
                    <b-nav-item-dropdown no-caret right v-if="!currentUser">
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em><font-awesome-icon icon="user-plus"/></em>
                        </template>
                        <b-dropdown-item to="/register">Register</b-dropdown-item>
                        <b-dropdown-item to="/login">Login</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <!-- When register -->
                        <b-nav-item v-if="showAdminBoard" to="/admin"><font-awesome-icon class="color-white" icon="cog"/></b-nav-item>
                        <b-nav-item v-if="currentUser"    to="/profile"><font-awesome-icon class="color-white" icon="user"/></b-nav-item>
                        <b-nav-item v-if="currentUser" right href @click.prevent="logOut"><font-awesome-icon class="color-white" icon="sign-out-alt"/></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <!-- Container (Router)-->
        <br>
        <b-container class="nav-bar-margin-top">
            <router-view/>
        </b-container>
    </b-container>
</template>

<script>

export default {
  name: 'App',
  data(){
    this.$i18n.locale = 'en';
    return{
        locale: 'en',
        languages: [
          { value: 'en', text: 'EN' },
          { value: 'fr', text: 'FR' },
          { value: 'nl', text: 'NL' },
        ]
    }
  },
  computed: {
    currentUser(){
        return this.$store.state.auth.user;
    },
    showAdminBoard(){
        if(this.currentUser && this.currentUser.roles){
            return this.currentUser.roles.includes('ROLE_ADMIN');
        }
        return false;
    }
  },
  methods: {
    logOut(){
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
    }
  },
  watch:{
    locale(val){
        this.$i18n.locale = val;
    }
  }
}
</script>

<style>

.personal-bg{
    background-color: #805262;
}

.color-white{
    color: white;
}

.nav-bar-margin-top{
    margin-top: 50px;
}
</style>