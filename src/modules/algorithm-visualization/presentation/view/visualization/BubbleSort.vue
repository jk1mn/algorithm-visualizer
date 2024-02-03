<script setup lang="ts">
import { ref, toRef, watch, computed } from 'vue';

import { swap } from '@/utils/arrays';
import type { SortingAlgorithmInput, SortingAlgorithmStep } from '@/modules/algorithm-visualization';

import ArrayList from './common/ArrayList.vue';
import ArrayItem from './common/ArrayItem.vue';

const props = defineProps<{
  steps: SortingAlgorithmStep[];
  input: SortingAlgorithmInput;
  position: number;
}>();

const input = toRef(props, 'input');

watch(
  () => props.position, (current, previous) => {
    const step = current > previous
      ? props.steps[current]
      : props.steps[previous];

    if (step?.changes) {
      swap(input.value.array, step.changes[0], step.changes[1]);
    }
  },
);

const listRef = ref<typeof ArrayList | null>(null);
const scalableElement = computed<HTMLElement | null>(() => listRef.value?.listElement);

defineExpose({
  scalableElement,
});
</script>

<template>
  <ArrayList :values="input.array" ref="listRef">
    <template #item="{ value, height, index }">
      <ArrayItem
        :value="value"
        :height="height"
        :class="{
          'array-list__item_highlighted': steps[position].highlightedIndexes?.includes(index),
          'array-list__item_processed': steps[position].lastUnsortedIndex < index,
        }"
      />
    </template>
  </ArrayList>
</template>

<style lang="scss" scoped>
.array-list__item_highlighted {
  background-color: var(--violet);
}

.array-list__item_processed {
  background-color: var(--green-3);
}
</style>
