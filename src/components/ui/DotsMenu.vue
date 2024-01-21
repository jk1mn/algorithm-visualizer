<script setup lang="ts" generic="T extends string">
import Button from '@/components/ui/Button.vue';

import type { MenuOptions } from './types';

defineEmits<{
  (e: 'menu-item-clicked', value: T): void;
}>();

const props = defineProps<{
  options: MenuOptions;
}>();
</script>

<template>
  <v-menu location="bottom right">
    <template v-slot:activator="{ props }">
      <Button
        icon="mdi-dots-vertical"
        v-bind="props"
      />
    </template>

    <v-list>
      <v-list-item
        v-for="option of props.options"
        :key="option.value"
        :value="option.value"
        density="compact"
        @click="$emit('menu-item-clicked', option.value)"
      >
        <v-list-item-title class="menu-item-title">{{ option.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped>
.menu-item-title {
  font-size: 14px;
}
</style>
