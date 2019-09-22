import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from './global/views/HelloWorld.vue';
import Game from './modules/09-game-playing/views/Game.vue';
import Login from './modules/01-User-Accounts/Views/Login';
import Quizs from './modules/04-quiz-administration/views/ViewQuiz.vue'
import Users from './modules/03-user-administration/views/Users.vue'
import LeaderboardSelect from './modules/12-leaderboard/views/LeaderboardSelect';
import Leaderboard from "./modules/12-leaderboard/views/Leaderboard";
import QuizCatalogue from "./modules/05-quiz-management/Views/QuizCatalogue";
import QuizCreator from "./modules/05-quiz-management/Views/Quiz-Creator";
import QuizView from "./modules/05-quiz-management/Views/QuizView";
import Host from './modules/07-Host-Game/Views/Host';
import HostCL from './modules/07-Host-Game/Views/HostCL'
import Join from './modules/07-Host-Game/Views/Join'
import Live from './modules/07-Host-Game/Views/Live';
import Logout from './modules/01-User-Accounts/Views/LogedOut';
import Settings from './modules/01-User-Accounts/Views/Settings';
import UserResults from './modules/11-user-results/views/user-results'

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
          path: '/quizview/:id',
          name: 'quizview',
          component: QuizView
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
        path: '/settings',
        name: 'Settings',
        component: Settings
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
          path: '/leaderboardselect',
          name: 'leaderboardselect',
          component: LeaderboardSelect
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
      },
      {
          path:'/leaderboard/:id',
          name: 'Leaderboard',
          component: Leaderboard
      },
      {
          path: '/user-results',
          name:'user-results',
          component: UserResults
      }
  ]
});

export default router;
