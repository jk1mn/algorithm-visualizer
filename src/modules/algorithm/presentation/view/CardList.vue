<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { type Algorithm, GetAlgorithmsCase } from '@/modules/algorithm';

import Card from './card/Card.vue';

const algorithms = ref<Algorithm[]>([]);

onBeforeMount(async () => {
  algorithms.value = await new GetAlgorithmsCase().getAll();
});
</script>

<template>
  <div class="algorithms-list">
    <Card
      v-for="algorithm in algorithms"
      :key="algorithm.type"
      :algorithm="algorithm"
    />
  </div>
</template>

<style scoped lang="scss">
.algorithms-list {
  display: flex;
  flex-wrap: wrap;
  padding: var(--gap-xl);
  gap: var(--gap-lg);
}
</style>
