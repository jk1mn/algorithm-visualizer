<script setup lang="ts">
import { getRandomList } from '@/modules/algorithm/utility/random';
import { SortNumericArrayInput } from '@/modules/algorithm/domain/dto/input/sort-numeric-array-input';

const emit = defineEmits<{
  (e: 'input-generated', input: SortNumericArrayInput): void;
}>();

function inputGenerated() {
  emit('input-generated', new SortNumericArrayInput(getRandomList()));
}
</script>

<template>
  <v-form class="alg-form" @submit.prevent="inputGenerated">
    <v-btn
      type="submit"
      block
      elevation="24"
    >
      Random
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
.alg-form {
  width: 100%;
  padding: 1rem;
}
</style>
