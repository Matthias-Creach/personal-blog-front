import Vue      from 'vue';
import Router   from 'vue-router';
import Home     from './views/Home.vue';
import Login    from './views/security/Login.vue';
import Register from './views/security/Register.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/', 
            name: 'home', 
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/security/Profile.vue')
        },
        {
            path: '/profile/:id',
            name: 'edit-profile',
            component: () => import('./views/security/Profile.vue')
        },
        {
            path: '/articles',
            name: 'articles',
            component: () => import('./views/articles/ArticleList.vue')
        },
        {
            path: '/articles/:id',
            name: 'article',
            props: true,
            component: () => import('./views/articles/Article.vue')
        },
        {
            path: '/new-article',
            name: 'new-article',
            component: () => import('./views/articles/NewArticle.vue')
        },
        {
            path: '/photographs',
            name: 'photographs',
            component: () => import('./views/photographs/Photograph.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./views/admin/Admin.vue')
        }
    ]
});