<script setup lang="ts">
import { toRef, computed, watch } from 'vue';

import { swap } from '@/utils/arrays';
import type { Step } from '@/modules/algorithm/domain/algorithms/solution/step';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import type { SortNumericArrayInput } from '@/modules/algorithm/domain/dto/input/sort-numeric-array-input';

import ListItemsSwapTransition from '../../transitions/ListItemsSwap.vue';

const props = defineProps<{
  steps: Step<AlgorithmType.BubbleSort>[];
  input: SortNumericArrayInput;
  position: number;
}>();

const input = toRef(props, 'input');

const maxNumber = computed(() => Math.max(...input.value.numbers));

watch(
  () => props.position, (current, previous) => {
    const step = current > previous
      ? props.steps[current]
      : props.steps[previous];

    if (step.payload?.changes) {
      swap(
        input.value.numbers,
        step.payload.changes[0],
        step.payload.changes[1]
      );
    }
  }
);

const maxItemHeight = 150;
const minItemHeight = maxItemHeight * 0.2;
</script>

<template>
  <ListItemsSwapTransition class="sort-list">
    <li
      v-for="(num, index) in input.numbers"
      :key="index"
      class="sort-list__item"
      :class="{
        'sort-list__item_highlighted': steps[position].payload?.highlightedIndexes?.includes(index),
        'sort-list__item_processed': steps[position].payload?.lastUnsortedIndex !== undefined
          && steps[position].payload!.lastUnsortedIndex < index,
      }"
      :style="{
        height:
          minItemHeight +
          (num * (maxItemHeight - minItemHeight)) / maxNumber +
          'px',
      }"
    >
      {{ num }}
    </li>
  </ListItemsSwapTransition>
</template>

<style lang="scss" scoped>
.sort-list {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.8em;

  --color-list-items: #644d25;
  --color-list-items-processed: #247c40ad;
  --color-list-items-active: rgb(90 129 173 / 65%);
}

.sort-list__item {
  display: flex;
  flex-flow: column-reverse;
  width: 1.1rem;
  background-color: var(--color-list-items);
  padding-left: 1px;
  padding-right: 1px;
  border: 1px solid #000;
  text-align: center;

  transition: all 0.5s;
}

.sort-list__item_highlighted {
  background-color: var(--color-list-items-active);
}

.sort-list__item_processed {
  background-color: var(--color-list-items-processed);
}
</style>
