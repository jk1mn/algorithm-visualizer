import { ViteSSG } from 'vite-ssg';
import 'vuetify/styles';
import { createPinia } from 'pinia';
import '@mdi/font/css/materialdesignicons.css';

import '@/assets/css/main.scss';

import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';

import { ApplicationException } from '@/shared/exceptions';
import { useAlertStore } from '@/modules/alert/store';

export const createApp = ViteSSG(
  App,
  router,
  ({ app }) => {
    const pinia = createPinia();

    app
      .use(vuetify)
      .use(pinia);

    app.config.errorHandler = function (err, instance, info) {
      const alertStore = useAlertStore();

      const alertTitle = 'Ooops, an error occurred';
      const hasErrorMessage = err instanceof ApplicationException && err.isUserError();

      alertStore.error({
        title: hasErrorMessage ? alertTitle : undefined,
        message: hasErrorMessage ? err.message : alertTitle,
      });

      console.error(err, info);
    };
  },
);
