import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router.js';
import * as firebase from "firebase/app";
import "firebase/database";

// Database
var firebaseConfig = {
  apiKey: "AIzaSyCrOYJFp1s2JZsmZfnUizGoEEZvyPwH5ow",
  authDomain: "acme-asd.firebaseapp.com",
  databaseURL: "https://acme-asd.firebaseio.com",
  projectId: "acme-asd",
  storageBucket: "",
  messagingSenderId: "217892308342",
  appId: "1:217892308342:web:2e5ae57a67eb68ff"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

Vue.prototype.$db = db;
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');