import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from './views/HelloWorld.vue';
import Game from './views/Game.vue';
import QuizCatalogue from "./views/QuizCatalogue";

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
        path: '/quizcatalogue',
        name: 'quizcatalogue',
        component: QuizCatalogue
      }
  ]
});

export default router;