import { ViteSSG } from 'vite-ssg';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

import '@/assets/css/main.scss';
import App from './App.vue';
import router, { routes } from './router';

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    const vuetify = createVuetify({
      theme: {
        defaultTheme: 'dark'
      },
    });

    app.use(vuetify);
  },
);
