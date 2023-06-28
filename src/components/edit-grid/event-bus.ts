import { useEventBus } from '@vueuse/core';

import { GridEvent } from '../ui/grid/event-bus';
import { useWidgetStore } from '../../modules/widget/store';
import type { Widgets } from '../../modules/widget/types';

const bus = useEventBus<GridEvent>('widget');

bus.on(function (event, payload) {
  const store = useWidgetStore();

  switch (event) {
    case GridEvent.SAVE_WIDGETS:
      store.saveWidgets(payload as Widgets);
      stopEditing(store);
      break;

    case GridEvent.CANCEL_WIDGETS:
      stopEditing(store);
      break;

    case GridEvent.DEFAULT_CLICK:
      store.useDefaultWidgets();
      stopEditing(store);
      break;
  }
});

function stopEditing (store: ReturnType<typeof useWidgetStore>) {
  store.setIsEditing(false);
}

export default bus;
