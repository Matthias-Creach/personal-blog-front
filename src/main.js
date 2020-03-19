import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import { router } from './router';
import store from './store';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import CKEditor from '@ckeditor/ckeditor5-vue';

import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCog, 

  faEye,
  faEdit,
  faTrashAlt,
  faFolderPlus,
  faImage,

  faTimes

} from '@fortawesome/free-solid-svg-icons';



library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faCog, faEye, faEdit, faTrashAlt, faTimes, faFolderPlus, faImage);

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
  errorBagName: "veeErrors"
});

Vue.use(VueI18n);
let locale = navigator.language;
const i18n = new VueI18n({
  fallBackLocale: 'en',
  locale: locale,
  messages: {
    en: {}
  }
});

Vue.use(CKEditor);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
	i18n, 
  router,
	store,
	render: h => h(App),
}).$mount('#app')
