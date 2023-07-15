<script setup lang="ts">
import { onMounted } from 'vue';

import Button from '@/components/ui/Button.vue';
import { SearchNumberInput } from '@/modules/algorithm/domain/dto/input/search-number-input';
import { getRandomTargetForSortedList, getRandomSortedList } from '@/modules/algorithm/utility/random';

const emit = defineEmits<{
  (e: 'input-generated', input: SearchNumberInput): void;
}>();

onMounted(inputGenerated);

function inputGenerated() {
  const array = getRandomSortedList();
  const target = getRandomTargetForSortedList(array);
  emit('input-generated', new SearchNumberInput(array, target));
}
</script>

<template>
  <v-form class="alg-form" @submit.prevent="inputGenerated">
    <Button
      type="submit"
      block
    >
      Random
    </Button>
  </v-form>
</template>

<style lang="scss" scoped>
.alg-form {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
}
</style>
