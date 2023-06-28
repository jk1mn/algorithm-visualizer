<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed, ref, watchEffect, markRaw, onBeforeMount } from 'vue';

import { useWidgetStore } from '@/modules/widget/store';
import { AlgorithmRoute } from '@/router/algorithm-routes';
import { GridEvent } from '@/components/ui/grid/event-bus';
import gridEventBus from '@/components/edit-grid/event-bus';
import EditGridPanel from '@/components/edit-grid/Panel.vue';
import Visualizer from '@/modules/algorithm/presentation/view/Visualizer.vue';

const store = useWidgetStore();

const { isEditing, widgets } = storeToRefs(store);

const route = useRoute();
const algRoute = computed(() =>
  AlgorithmRoute.current(route.params.name as string)
);

const preview = ref(null);
const loadingPreview = ref(false);

const form = ref(null);
const loadingForm = ref(false);

watchEffect(() => {
  loadingForm.value = true;
  loadingPreview.value = true;

  algRoute.value?.getPreview().then((component) => {
    preview.value = markRaw(component.default);
  }).finally(() => {
    loadingPreview.value = false;
  });

  algRoute.value?.getForm().then((component) => {
    form.value = markRaw(component.default);
  }).finally(() => {
    loadingForm.value = false;
  });
});

onBeforeMount(() => {
  store.initializeWidgets();
});

function saveGrid () {
  gridEventBus.emit(GridEvent.SAVE_CLICK);
}

function cancelEditingGrid () {
  gridEventBus.emit(GridEvent.CANCEL_CLICK);
}

function useDefaultWidgets () {
  gridEventBus.emit(GridEvent.DEFAULT_CLICK);
}
</script>

<template>
  <Visualizer
    :header="algRoute.name"
    :algorithm-type="algRoute.type"
    :form-component="form"
    :preview-component="preview"
    :loading-form="loadingForm"
    :loading-preview="loadingPreview"
    :widgets="widgets"
    :is-editing-grid="isEditing"
    :grid-event-bus="gridEventBus"
  />
  <EditGridPanel
    :visible="isEditing"
    @submit="saveGrid"
    @cancel="cancelEditingGrid"
    @use-default="useDefaultWidgets"
  />
</template>
