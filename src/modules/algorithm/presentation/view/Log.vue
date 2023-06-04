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
  <div class="logs-wrapper">
    <v-list ref="container" class="logs">
      <v-list-item
        v-for="(log, index) in logs"
        :key="index"
        v-html="log"
        class="logs__item"
      />
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.logs-wrapper {
  overflow: hidden;
  border-radius: 1rem;
}

.logs {
  height: 200px;
  padding: 1rem 0;
  margin: 0;
  overflow-y: auto;
}

.logs__item {
  display: flex;
  gap: 4px;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #424242;
  font-size: 0.94em;
  line-height: 1rem;
}
</style>
