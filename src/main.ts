import { createApp } from 'vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

import '@/assets/css/main.scss';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
});

app.use(vuetify).use(router);

app.mount('#app');