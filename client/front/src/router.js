import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import Singin from './views/Singin.vue';
import AddData from './views/AddData.vue';
import ListData from './views/ListData.vue';
import UserInfo from './views/UserInfo.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/singin',
            name: 'singin',
            component: Singin
        },
        {
            path: '/add',
            name: 'add',
            component: AddData
        },
        {
            path: '/user-info',
            name: 'userinfo',
            component: UserInfo
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/listdata',
            name: 'listdata',
            component: ListData
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
});
