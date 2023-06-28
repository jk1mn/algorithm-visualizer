import type { UseEventBusReturn } from '@vueuse/core';

import type { Widgets } from '@/modules/widget/types';

export enum GridEvent {
  SAVE_CLICK = 'save_click',
  SAVE_WIDGETS = 'save_widgets',
  CANCEL_CLICK = 'cancel_click',
  CANCEL_WIDGETS = 'cancel_widgets',
  DEFAULT_CLICK = 'default_click',
}

export type GridEventBus = UseEventBusReturn<GridEvent, Widgets | never>;
