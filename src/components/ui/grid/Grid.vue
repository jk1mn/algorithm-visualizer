<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref } from 'vue';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

import type { Widgets } from '@/modules/widget/types';
import { Widget } from '@/modules/widget/domain/entity/widget';

import { GridEvent, type GridEventBus } from './event-bus';

const props = defineProps<{
  editing: boolean;
  layout: Widget[],
  eventBus?: GridEventBus,
}>();

const gridBottomMargin = ref<string|number>(0);

let grid: GridStack | null = null;

props.eventBus?.on(function (event) {
  switch (event) {
    case GridEvent.SAVE_CLICK:
      saveGrid();
      break;
    case GridEvent.CANCEL_CLICK:
      updateGrid();
      props.eventBus?.emit(GridEvent.CANCEL_WIDGETS);
      break;
  }
});

watch(() => props.editing, () => {
  setIsEditableGrid();

  gridBottomMargin.value = props.editing ? '100px' : 0;
});

watch(() => props.layout, () => {
  updateGrid();
});

onMounted(() => {
  grid = GridStack.init({
    float: false,
  });

  setIsEditableGrid();
});

onUnmounted(() => {
  grid?.removeAll();
});

function setIsEditableGrid () {
  grid!.setStatic(!props.editing);
}

function saveGrid () {
  if (!grid || !props.eventBus) return;

  const items = grid.save() as Widget[];

  const widgets = {} as Widgets;
  (items || []).forEach(widget => {
    widgets[widget.id] = new Widget(widget);
  });

  props.eventBus.emit(GridEvent.SAVE_WIDGETS, widgets);
}

function updateGrid () {
  grid!.load(props.layout);
}
</script>

<template>
  <div class="grid-stack">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.grid-stack {
  margin-bottom: v-bind(gridBottomMargin);
}
</style>
