<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
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
