import { useEventBus } from '@vueuse/core';

export enum Event {
  Fullscreen = 'Fullscreen',
}

const eventBus = useEventBus<Event>('global');

export default eventBus;
