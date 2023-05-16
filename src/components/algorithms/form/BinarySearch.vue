<script setup lang="ts">
import type { SearchNumberInput } from '@/modules/algorithm/domain/dto/input/search-number-input';

defineEmits<{
  (e: 'generated'): SearchNumberInput;
}>();
</script>

<template>
  <v-form>
    <v-btn @click="$emit('click')"> Random </v-btn>
  </v-form>
</template>

<style lang="scss" scoped></style>
