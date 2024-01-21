<script setup lang="ts">
import { computed } from 'vue';

import Panel from '@/components/ui/panel/Panel.vue';
import { AlgorithmType } from '@/modules/algorithm';

import BubbleSort from './info/BubbleSort.vue';
import BinarySearch from './info/BinarySearch.vue';

const props = defineProps<{
  type: AlgorithmType | null;
}>();

const component = computed(() => {
  switch (props.type) {
    case AlgorithmType.BinarySearch:
      return BinarySearch;
    case AlgorithmType.BubbleSort:
      return BubbleSort;
    default:
      return null;
  }
});
</script>

<template>
  <Panel title="Info" with-padding>
    <component v-if="component" :is="component" />
  </Panel>
</template>

<style lang="scss" scoped>
:deep(.ui-panel__body) {
  * + * {
    margin-top: 15px;
  }
}
</style>
