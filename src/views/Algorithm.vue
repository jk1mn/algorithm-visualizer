<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref, watchEffect, markRaw, onBeforeMount } from 'vue';

import { AlgorithmRoute } from '@/router/algorithm-routes';
import Visualizer from '@/modules/algorithm/presentation/view/Visualizer.vue';
import { GetWidgetsCase } from '@/modules/widget/domain/usecase/get-widgets';
import { WidgetLocalStorageRepository } from '@/modules/widget/domain/repository/widget-local-storage-repository';
import type { Widgets } from '@/modules/widget/types';

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

const getWidgetsCase = new GetWidgetsCase(new WidgetLocalStorageRepository());

const widgets = ref<Widgets | null>(null);

onBeforeMount(() => {
  widgets.value = getWidgetsCase.execute();
});
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
  />
</template>
