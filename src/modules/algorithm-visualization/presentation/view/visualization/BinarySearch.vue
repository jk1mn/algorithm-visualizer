<script setup lang="ts">
import { ref, type ComponentPublicInstance } from 'vue';
import { SearchAlgorithmInput, SearchAlgorithmStep } from '@/modules/algorithm-visualization';

import ArrayList from './common/ArrayList.vue';
import ArrayItem from './common/ArrayItem.vue';

defineProps<{
  steps: SearchAlgorithmStep[];
  input: SearchAlgorithmInput;
  position: number;
}>();

const visualizationRef = ref<ComponentPublicInstance | null>(null);

defineExpose({
  scalableElement: visualizationRef,
});
</script>

<template>
  <div ref="visualizationRef">
    <p>Target: {{ input.target }}</p>
    <ArrayList :values="input.array">
      <template #item="{ value, height, index }">
        <ArrayItem
          :value="value"
          :height="height"
          :class="{
              'list__item_highlighted': steps[position].highlightedIndexes?.includes(index),
              'list__item_current': steps[position].currentIndex === index,
              'list__item_success': steps[position].indexSuccess === index,
            }"
        />
      </template>
    </ArrayList>
  </div>
</template>

<style lang="scss" scoped>
.list__item_highlighted {
  background-color: var(--violet);
}

.list__item_current {
  background-color: var(--yellow);
}

.list__item_success {
  background-color: var(--green-3);
}
</style>
