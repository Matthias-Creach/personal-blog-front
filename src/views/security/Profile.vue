<template>
    <b-container>
        <b-alert show> {{ $t('title')}} <strong>{{currentUser.username}}</strong></b-alert>

        <b-form @submit="onSubmit" @reset="onReset">

            <!-------------------------------------------------------- Email change -------------------------------------------------------->
            <h4>Email</h4>
            <hr>
            
            <PersonalFormGroup
                :label            = "$t('label_email')"
                v-bind:title.sync = "currentUser.email"

                short    =       "email"
                feedback = "input-email-feedback"

                type     = "email"
                disabled = "true"
            />

            <PersonalFormGroup
                :label           = "$t('label_new_email')"
                :invalid         = "$t('invalid_email')"
                v-bind:title.sync="updateUser.new_email"

                short    =       "new-email"
                id       = "input-new-email"
                feedback = "input-new-email-feedback"
                
                type="email"
                rules="required|email|max:50"
            />


            <PersonalFormGroup
                :label            = "$t('label_new_email')"
                :invalid          = "$t('invalid_email')"
                v-bind:title.sync = "updateUser.confirm_new_email"

                short    =       "confirm-new-email"
                id       = "input-confirm-new-email"
                feedback = "input-confirm-new-email-feedback"
                
                type  = "email"
                rules = "required|email|max:50"
            />

            <br>
            <!----------------------------------------------------- Password change ----------------------------------------------------->
            <h4>Password</h4>
            <hr>

            <PersonalFormGroup
                :label            = "$t('label_password')"
                :invalid          = "$t('invalid_password')"
                v-bind:title.sync = "updateUser.password"

                short    =       "password"
                id       = "input-password"
                feedback = "input-password-feedback"

                type  = "password"
                rules = "required|min:5|max:20"
            />

            <PersonalFormGroup
                :label            = "$t('label_new_password')"
                :invalid          = "$t('invalid_password')"
                v-bind:title.sync = "updateUser.new_password"

                short    =       "new-password"
                id       = "input-new-password"
                feedback = "input-new-password-feedback"

                type  ="password"
                rules ="required|min:5|max:20"
            />

            <PersonalFormGroup
                :label            = "$t('label_confirm_new_password')"
                :invalid          = "$t('invalid_password')"
                v-bind:title.sync = "updateUser.confirm_new_password"

                short   =      "confirm-new-password"
                id      ="input-confirm-new-password"
                feedback="input-confirm-new-password-feedback"

                type  = "password"
                rules = "required|min:5|max:20"
            />

            <!----------------------------------------------------------- Buttons actions ----------------------------------------------------------->
            <b-container v-if="errors.length > 0">
                <b-alert  v-for="(err, index) in errors" :key="`errors-${index}`" show variant="danger">{{err}}</b-alert>
            </b-container>

            <b-container class="text-center">
                <b-button class="classic-margin" type="button" @click.prevent="onSubmit()" variant="primary">Save</b-button>
                <b-button class="classic-margin" type="reset" variant="danger">Reset</b-button>
            </b-container>
            <br>
        </b-form>
    </b-container>
</template>

<script>

import PersonalFormGroup from '../PersonalFormGroup.vue';

import UserService from '../../services/user.service';

export default {
  name: 'Profile',
  components: {
    PersonalFormGroup
  },
  data(){
    return{
        errors: [],
        updateUser: {
            new_email: '', 
            confirm_new_email: '', 
            password: '', 
            new_password: '', 
            confirm_new_password: '',
        }
    }
  },
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

    validateState(ref){
        if(this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)){
            return !this.veeErrors.has(ref);
        }
        return null;
    },

    onSubmit(){
        this.errors = [];
        this.$validator.validateAll().then(isValid => {
            if(isValid){
                var user = {}
                if(this.updateUser.new_password !== this.updateUser.confirm_new_password){
                    this.errors.push('Password confirmation error!')
                }else{
                    user.id       = this.currentUser.id;
                    user.email    = this.updateUser.confirm_new_email
                    user.password = this.updateUser.confirm_new_password
                    user.token    = this.currentUser.token
                    console.log(user)    
                    UserService.updateUser(user.id, user).then(() => this.$router.push('/profile'));    
                }
                
            }
            
        });
    },
    onReset(){
        this.errors = [];
        this.updateUser =  {
            new_email: '', 
            confirm_new_email: '', 
            password: '', 
            new_password: '', 
            confirm_new_password: ''
        }
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

<i18n>
{
    "en": {
        "title":                      "Hi",

        "label_email":                "Email",
        "label_new_email":            "Enter New email",
        "label_confirm_new_email":    "Confirm new email",
        "invalid_email":              "The format of the email is incorrect.",

        "label_password":             "Enter your password",
        "label_new_password":         "Enter new password",
        "label_confirm_new_password": "Confirm new password",
        "invalid_password":           "The format of the password is incorrect (between 8 and 20 characters)."
    }, 
    "fr": {
        "title":                      "Bonjour",

        "label_email":                "Email",
        "label_new_email":            "Nouvel email",
        "label_confirm_new_email":    "Confirmer email",
        "invalid_email":              "Le format de l'email renseigné est incorrect.",

        "label_password":             "Entrer votre mot de passe",
        "label_new_password":         "Nouveau mot de passe",
        "label_confirm_new_password": "Confirmer nouveau mot de passe",
        "invalid_password":           "Le format du mot de passe est incorrect (entre 8 et 20 caractères)."
    },
    "nl": {
        "title":                      "Goedemorgen",

        "label_email":                "Email",
        "label_new_email":            "Voer nieuwe e-mail in",
        "label_confirm_new_email":    "Bevestig nieuwe e-mail",
        "invalid_email":              "Het formaat van de ingevoerde e-mail is onjuist.",

        "label_password":             "Voer uw wachtwoord in",
        "label_new_password":         "Voer een nieuw wachtwoord in",
        "label_confirm_new_password": "Bevestig nieuw wachtwoord",
        "invalid_password":           "Het formaat van het wachtwoord is onjuist (tussen 8 en 20 tekens)."
    }
}
</i18n>