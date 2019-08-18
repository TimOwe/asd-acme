import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from './global/views/HelloWorld.vue';
import Game from './modules/09-game-playing/views/Game.vue';
import Login from './modules/01-User-Accounts/Views/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'home',
        component: HelloWorld
    },
    {
        path: '/game',
        name: 'game',
        component: Game
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
  ]
});

export default router;