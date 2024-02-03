<script setup lang="ts">
import { computed, type StyleValue } from 'vue';

import { AlgorithmCategoryType } from '@/modules/algorithm';

const props = defineProps<{
  name: string,
  type: AlgorithmCategoryType,
}>();

const cssClass = computed<string>(() => props.type
  .toLowerCase()
  .replaceAll(' ', '-'));

const style = computed<StyleValue | null>(() => {
  switch (props.type) {
    case AlgorithmCategoryType.Search:
    case AlgorithmCategoryType.Sorting:
      return { backgroundColor: 'var(--green-1)', borderColor: 'var(--green-2)' };
    default:
      return null;
  }
});
</script>

<template>
  <v-chip class="chip" :class="cssClass" variant="outlined" :style="style">
    {{ name }}
  </v-chip>
</template>

<style scoped lang="scss">
.chip {
  --v-chip-height: 24px;

  margin: 0;
  font-size: 0.75rem;
  color: var(--white);
}
</style>
