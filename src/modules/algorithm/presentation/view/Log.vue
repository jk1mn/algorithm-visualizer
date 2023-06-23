<script setup lang="ts">
import { onUpdated, ref, type ComponentPublicInstance } from 'vue';

import Panel from '@/components/ui/Panel.vue';

defineProps<{
  logs: string[];
}>();

const container = ref<ComponentPublicInstance | null>(null);

onUpdated(() => {
  container.value?.$el?.scroll({ top: container.value?.$el?.scrollHeight });
});
</script>

<template>
  <Panel title="Logs">
    <v-list ref="container" class="logs">
      <v-list-item
        v-for="(log, index) in logs"
        :key="index"
        v-html="log"
        class="logs__item"
      />
    </v-list>
  </Panel>
</template>

<style lang="scss" scoped>
.logs {
  height: 100%;
  padding: 0;
  margin: 0;
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
