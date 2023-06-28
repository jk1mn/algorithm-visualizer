import { defineStore } from 'pinia';

import type { Widgets } from '../types';
import { GetWidgetsCase } from '../domain/usecase/get-widgets';
import { SaveWidgetsCase } from '../domain/usecase/save-widgets';
import { ClearWidgetsCase } from '../domain/usecase/clear-widgets';
import { WidgetLocalStorageRepository } from '../domain/repository/widget-local-storage-repository';

export const useWidgetStore = defineStore<'widget', {
  isEditing: boolean;
  widgets: Widgets | null;
}, {}, {
  setIsEditing: (isEditing: boolean) => void;
  initializeWidgets: () => void;
  saveWidgets: (widgets: Widgets) => void;
  useDefaultWidgets: () => void;
}>('widget', {
  state: () => ({
    isEditing: false,
    widgets: null,
  }),
  actions: {
    setIsEditing (isEditing) {
      this.isEditing = isEditing;
    },
    initializeWidgets () {
      const usecase = new GetWidgetsCase(new WidgetLocalStorageRepository());
      this.widgets = usecase.execute();
    },
    saveWidgets (widgets) {
      const usecase = new SaveWidgetsCase(new WidgetLocalStorageRepository());
      usecase.execute(widgets);
    },
    useDefaultWidgets () {
      const usecase = new ClearWidgetsCase(new WidgetLocalStorageRepository());
      usecase.execute();

      this.initializeWidgets();
    },
  },
});
