import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from './global/views/HelloWorld.vue';
import Game from './modules/09-game-playing/views/Game.vue';
import Login from './modules/01-User-Accounts/Views/Login';
import Results from './modules/11-user-results/views/Results';
import Leaderboard from "./modules/11-user-results/views/Leaderboard";

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
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
      {
          path: '/results',
          name: 'results',
          component: Results
      },
      {
          path: '/leaderboard',
          name: 'leaderboard',
          component: Leaderboard
      }
  ]
});

export default router;