<script setup lang="ts">
import { toRef, computed, watch } from 'vue';

import type { Step } from '@/modules/algorithm/domain/algorithms/solution/step';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import type { SearchNumberInput } from '@/modules/algorithm/domain/dto/input/search-number-input';

const props = defineProps<{
  steps: Step<AlgorithmType.BinarySearch>[];
  input: SearchNumberInput;
  position: number;
}>();

const input = toRef(props, 'input');

const maxNumber = computed(() => Math.max(...input.value.numbers));

const maxItemHeight = 150;
const minItemHeight = maxItemHeight * 0.2;
</script>

<template>
  <div class="flex-wrapper">
    <p>Target: {{ input.target }}</p>
    <ul class="list">
      <li
        v-for="(num, index) in input.numbers"
        :key="index"
        class="list__item"
        :class="{
          'list__item_highlighted': steps[position].payload?.highlightedIndexes?.includes(index),
          'list__item_current': steps[position].payload?.currentIndex === index,
          'list__item_success': steps[position].payload?.indexSuccess === index,
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
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.flex-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}

.list {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.8em;

  --color-list-items: #644d25;
  --color-list-items-current: rgba(224, 209, 0, 0.678);
  --color-list-items-success: #247c40ad;
  --color-list-items-active: rgb(90 129 173 / 65%);
}

.list__item {
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

.list__item_highlighted {
  background-color: var(--color-list-items-active);
}

.list__item_current {
  background-color: var(--color-list-items-current);
}

.list__item_success {
  background-color: var(--color-list-items-success);
}
</style>
