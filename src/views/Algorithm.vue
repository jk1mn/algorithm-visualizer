<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';

import { Visualization } from '@/modules/algorithm-visualization';
import { GetAlgorithmsCase, type Algorithm } from '@/modules/algorithm';

const route = useRoute();
const router = useRouter();

const usecase = new GetAlgorithmsCase();
const algorithm = ref<Algorithm | null>(null);

onBeforeMount(async () => {
  algorithm.value = await usecase.getOne(route.params.name as string);

  if (!algorithm.value) {
    await router.replace({ name: 'not-found' });
  }
});

onBeforeRouteUpdate(async (to, from, next) => {
  algorithm.value = await usecase.getOne(to.params.name as string);

  if (algorithm.value) {
    next();
  } else {
    next({ name: 'not-found' });
  }
});
</script>

<template>
  <Visualization
    v-if="algorithm"
    :header="algorithm.name"
    :algorithm-type="algorithm.type"
  />
</template>
