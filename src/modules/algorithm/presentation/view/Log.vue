<script setup lang="ts">
import { onUpdated, ref, type ComponentPublicInstance } from 'vue';

defineProps<{
  logs: string[];
}>();

const container = ref<ComponentPublicInstance | null>(null);

onUpdated(() => {
  container.value?.$el?.scroll({ top: container.value?.$el?.scrollHeight });
});
</script>

<template>
  <v-list ref="container" class="logs">
    <v-list-item
      v-for="(log, index) in logs"
      :key="index"
      :title="log"
      class="logs__item"
    />
  </v-list>
</template>

<style lang="scss" scoped>
.logs {
  border-radius: 1rem;
  height: 200px;
  padding: 1rem 0;
  margin: 0;
  overflow-y: auto;
}

.logs__item {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #424242;

  :deep(.v-list-item-title) {
    font-size: 0.94em;
    line-height: 1rem;
  }
}
</style>
