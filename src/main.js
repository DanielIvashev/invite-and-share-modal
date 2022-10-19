import { createApp } from 'vue';
import { Notify, Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import '@quasar/extras/material-icons/material-icons.css';
import '@/styles/main.scss';
import App from './App.vue';
import { iconsSvg } from '@/utils';
import { router } from '@/router';

const app = createApp(App);

app.config.devtools = true;
app.config.globalProperties.$icons = iconsSvg;

app.use(Quasar, {
    plugins: {
        Notify
    }
});
app.use(router);
app.mount('#app');
