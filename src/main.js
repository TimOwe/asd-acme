import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router.js';
import * as firebase from "firebase/app";
import "firebase/database";

var loginUtils = {};

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


var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();

loginUtils.database = app.database();

var VueCookies = require('vue-cookies');

Vue.prototype.$db = db;

//Gets users from the database
    loginUtils.getUsers = function(){
        return new Promise(resolve => {
            var users = [];
            this.database.ref('/Users').once('value', (snap) => {
                //Gets a snapshot of data, without listening for changes. 'Value' is an event.
                snap.forEach(user => {
                    var userObj = user.val();
                    //Extracts contents of 'user' in the snapshot
                    userObj.key = user.key;
                    //Sets the key (e.g. 1)
                    users.push(userObj);
                });
                resolve(users);
            });
        })
    };

    //Checks if user with email already exists
     loginUtils.checkUserExists = async function(email){
         var authObj = {},
             matched = [],
             users = await loginUtils.getUsers();

        users.forEach((user) => {
            if (user.email === email) {
                matched.push(user)
            }
        });

        authObj.user = matched[0];
        return authObj;
    };

Vue.prototype.$Test = function(){


    this.desc = '';

    this.whenI = function(whenI){
      this.desc = whenI;
      return this;
    };

    this.lastData = null;

    this.lastResult = null;

    this.expected = null;

    this.using = function(callback, args){
        if(!!args){
            this.lastData = callback(arguments[1],arguments[2],arguments[3]);
        } else {
          this.lastData = callback();
        }
        return this;
    };

    this.IShouldGet = function(value,args){
        if(typeof value !== 'function'){
            this.expected = value;
            this.lastResult = value === this.lastData;
            return this;
        } else if (!!args){
            value(this.lastData);
        } else {
            value(args[1], args[2], args[3])
        }
    };

    this.toBool = function(){
        return this.lastResult === true;
    };

    this.andThen = this.using;

    this.print = function(){
        if(this.lastResult === true){
            console.log('OPERATIONAL: When you ' + this.desc + ' using:', this.using )
        } else {
            console.log('FAILED: When you ' + this.desc + ' using:', this.using );
            console.log('EXPECTED: ' + this.expected + '\t ACTUAL: ' + this.lastData)
        }
    };
};

Vue.config.productionTip = false;
Vue.use(VueCookies);

export default new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');

export {loginUtils};
