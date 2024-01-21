import { defineStore } from 'pinia';

import uuid, { type UUID } from '@/shared/uuid';
import { type Alert, type AlertOptions, AlertType } from '@/modules/alert/domain/types';

export const useAlertStore = defineStore<'alert', {
  alerts: Alert[],
},
  Record<string, never>,
  {
    info: (alert: AlertOptions) => void;
    error: (alert: AlertOptions) => void;
    warning: (alert: AlertOptions) => void;
    success: (alert: AlertOptions) => void;
    show: (alert: AlertOptions, type: AlertType) => void;
    close: (id: UUID) => void;
  }>(
  'alert',
  {
    state: () => ({
      alerts: [],
    }),

    actions: {
      info (alert) {
        this.show(alert, AlertType.Info);
      },

      error (alert) {
        this.show(alert, AlertType.Error);
      },

      warning (alert) {
        this.show(alert, AlertType.Warning);
      },

      success (alert) {
        this.show(alert, AlertType.Success);
      },

      show (alert, type) {
        this.alerts.push({
          ...alert,
          type,
          id: uuid(),
          closable: alert.closable ?? true,
        });
      },

      close (id) {
        const index = this.alerts.findIndex(alert => alert.id === id);
        if (index) {
          this.alerts.splice(index, 1);
        }
      },
    },
  });
