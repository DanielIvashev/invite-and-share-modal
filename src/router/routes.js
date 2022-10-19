const Home = () => import('@/pages/Home.vue');

export const routes = [
    {
        path: '/',
        name: 'Main',
        component: Home,
        meta: {
            layout: 'guest-layout'
        }
    }
];
