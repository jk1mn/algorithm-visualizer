<script setup lang="ts">
import { computed } from 'vue';

import { AlgorithmComplexity } from '@/modules/algorithm';

const props = defineProps<{
  value: AlgorithmComplexity,
}>();

const complexity = computed<string>(() => {
  switch (props.value) {
    case AlgorithmComplexity.O1:
      return 'O(1)';
    case AlgorithmComplexity.OlogN:
      return 'O(log n)';
    case AlgorithmComplexity.ON:
      return 'O(n)';
    case AlgorithmComplexity.ONlogN:
      return 'O(n log n)';
    case AlgorithmComplexity.ON2:
      return 'O(n<sup><small>2</small></sup>)';
    case AlgorithmComplexity.ON3:
      return 'O(n<sup><small>3</small></sup>)';
    default:
      return '';
  }
});
</script>

<template>
  <span class="complexity" v-html="complexity" />
</template>

<style lang="scss" scoped>
.complexity {
  white-space: nowrap;
}
</style>
