<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import type { MenuOption } from '@/modules/algorithm/presentation/constants';

import type { MenuOptions } from './types';

defineEmits<{
  (e: 'menu-item-clicked', value: MenuOption): void;
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
        @click="$emit('menu-item-clicked', option.value as MenuOption)"
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
