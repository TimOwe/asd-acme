import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from './global/views/HelloWorld.vue';
import Game from './modules/09-game-playing/views/Game.vue';
import Login from './modules/01-User-Accounts/Views/Login';
import Quizs from './modules/04-quiz-administration/views/ViewQuiz.vue'
import Users from './modules/03-user-administration/views/Users.vue'
import Results from './modules/11-user-results/views/Results';
import Leaderboard from "./modules/11-user-results/views/Leaderboard";
import QuizCatalogue from "./modules/05-quiz-management/Views/QuizCatalogue";
import QuizCreator from "./modules/05-quiz-management/Views/Quiz-Creator";
import Host from './modules/07-Host-Game/Views/Host';
import HostCL from './modules/07-Host-Game/Views/HostCL'
import Join from './modules/07-Host-Game/Views/Join'
import Live from './modules/07-Host-Game/Views/Live';
import Logout from './modules/01-User-Accounts/Views/LogedOut';

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
          path: '/quiz-creator',
          name: 'quiz-creator',
          component: QuizCreator
      },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
      path: '/quizs',
      name: 'quizs',
      component: Quizs
  },
  {
      path: '/users',
      name: 'users',
      component: Users
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
      },
      {
          path: '/host',
          name: 'Host',
          component: Host
      },{
          path: '/host/:id',
          name: 'Host Live',
          component: HostCL
      },
      {
          path: '/live/:id',
          name: 'Live',
          component: Live
      },
      {
          path: '/join',
          name: 'Join',
          component: Join
      }
  ]
});

export default router;
