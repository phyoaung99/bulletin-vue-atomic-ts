import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import '@/assets/styles/app.scss';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
