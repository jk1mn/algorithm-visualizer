<script setup lang="ts">
import { onUpdated, ref } from 'vue';

defineProps<{
  logs: string[];
}>();

const container = ref<HTMLDivElement | null>(null);

onUpdated(() => {
  container.value?.scroll({ top: container.value?.scrollHeight });
});
</script>

<template>
  <div class="logs" ref="container">
    <v-list class="logs__list">
      <v-list-item
        v-for="(log, index) in logs"
        :key="index"
        :title="log"
        class="logs__list-item"
      />
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.logs {
  background-color: var(--vt-c-green);
  border-radius: 1rem;
  height: 15rem;
  padding: 1rem 0;
  overflow-y: scroll;

  @media (min-width: 641px) {
    margin-left: 3rem;
    margin-right: 3rem;
  }
}

.logs__list {
  margin: 0;
}

.logs__list-item {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--vt-c-cream);
}
</style>
