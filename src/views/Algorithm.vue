<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref, watchEffect, markRaw } from 'vue';

import { AlgorithmRoute } from '@/router/algorithm-routes';
import Visualizer from '@/modules/algorithm/presentation/view/Visualizer.vue';

const route = useRoute();
const algRoute = computed(() =>
  AlgorithmRoute.current(route.params.name as string)
);

const preview = ref(null);

const form = ref(null);

watchEffect(() => {
  algRoute.value.getPreview().then((component) => {
    console.log(component, component?.default);
    preview.value = markRaw(component.default);
  });

  algRoute.value.getForm().then((component) => {
    form.value = markRaw(component.default);
  });
});
</script>

<template>
  <Visualizer
    :header="algRoute.name"
    :algorithm-type="algRoute.type"
    :form-component="form"
    :preview-component="preview"
  />
</template>
