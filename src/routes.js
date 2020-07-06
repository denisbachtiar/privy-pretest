import AuthLayout from './AuthLayout.vue'

export const routes = [
    {
        path: '/', component: AuthLayout,
        children: [
            {
                path: 'register',
                component: () => import(/* webpackChunkName: "register" */
                    './components/register/Index.vue'),
                name: 'Register'
            },
            {
                path: '',
                component: () => import(/* webpackChunkName: "login" */
                    './components/login/Index.vue'),
                name: 'Login'
            },
            {
                path: 'main',
                component: () => import(/* webpackChunkName: "home" */
                    './components/home/Index.vue'),
                name: 'Home'
            }
        ]
    },
    {
        path: '*', redirect: '/'
    }
];