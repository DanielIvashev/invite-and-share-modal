import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from) {
        if (from.meta.disableScrollBehavior) {
            return Promise.resolve();
        }
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ left: 0, top: 0, behavior: 'smooth' });
            }, 500);
        });
    }
});
