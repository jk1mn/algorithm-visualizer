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
import { FailedImportException } from '@/shared/exceptions';

const store = useWidgetStore();

const { isEditing, widgets } = storeToRefs(store);

const route = useRoute();
const algRoute = computed(() =>
  AlgorithmRoute.current(route.params.name as string)
);

const preview = ref(null);
const form = ref(null);
const info = ref(null);
const loading = ref(false);

watchEffect(() => {
  loading.value = true;

  Promise.all([
    algRoute.value?.getPreview(),
    algRoute.value?.getForm(),
    algRoute.value?.getInfo(),
  ])
    .then(components => {
      console.log(components)
      preview.value = markRaw(components[0].default);
      form.value = markRaw(components[1].default);
      info.value = markRaw(components[2].default);
    })
    .catch((e) => {
      throw new FailedImportException(e?.message, { cause: e });
    })
    .finally(() => {
      loading.value = false;
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
    :info-component="info"
    :loading="loading"
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
