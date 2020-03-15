<template>
    <b-container>
        <b-alert show>Welcome <strong>{{currentUser.username}}</strong></b-alert>

        <b-form @submit="onSubmit" @reset="onReset">

            <!-- Email change -->
            <h4>Email</h4>
            <hr>
            <b-form-group
                id="fieldset-horizontal"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Email"
                label-for="input-horizontal"
                >
                <b-form-input type="text" id="input-horizontal" v-model="currentUser.email" disabled></b-form-input>
            </b-form-group>
            <b-form-group
                id="fieldset-horizontal"
                label-cols-sm="4"
                label-cols-lg="3"
                label="New email"
                label-for="input-horizontal"
                >
                <b-form-input type="text" id="input-horizontal"></b-form-input>
            </b-form-group>

            <b-form-group
                id="fieldset-horizontal"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Confirm new email"
                label-for="input-horizontal"
                >
                <b-form-input type="text" id="input-horizontal"></b-form-input>
            </b-form-group>
            <br>

            <!-- Password change -->
            <h4>Password</h4>
            <hr>
            <b-form-group
                id="fieldset-horizontal"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Enter your password"
                label-for="input-horizontal"
                >
                <b-form-input type="password" id="input-horizontal"></b-form-input>
            </b-form-group>

            <b-form-group
              id="fieldset-horizontal"
              label-cols-sm="4"
              label-cols-lg="3"
              label="New Password"
              label-for="input-horizontal"
            >
                <b-form-input type="password" id="input-horizontal"></b-form-input>
            </b-form-group>

            <b-form-group
                id="fieldset-horizontal"
                label-cols-sm="4"
                label-cols-lg="3"
                label="Confirm new password"
                label-for="input-horizontal"
            >
                <b-form-input type="password" id="input-horizontal"></b-form-input>
            </b-form-group>

            <!-- Buttons actions -->
            <b-container class="text-center">
                <b-button class="classic-margin" type="submit" variant="primary">Save</b-button>
                <b-button class="classic-margin" type="reset" variant="danger">Reset</b-button>
            </b-container>
            <br>
        </b-form>
    </b-container>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods:{
    onSubmit(){
        console.log("submit");
    },
    onReset(){
        console.log("reset")
    }
  }
};
</script>

<style>

.classic-margin{
    margin-left: 10px;
    margin-right: 10px;
}
</style>