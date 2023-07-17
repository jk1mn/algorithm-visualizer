<script setup lang="ts" generic="T extends string">
import { computed } from 'vue';

import DotsMenu from './DotsMenu.vue';
import type { MenuOptions } from './types';

defineEmits<{
  (e: 'menu-item-clicked', value: T): void;
}>();

const props = withDefaults(defineProps<{
  height?: string;
  title?: string;
  withPadding?: boolean;
  menuOptions?: MenuOptions;
}>(), {
  height: '100%',
  withPadding: false,
  menuOptions: () => [],
});

const bodyCssVars = computed(() => {
  return props.withPadding
    ? { '--padding': '1rem' }
    : undefined;
});
</script>

<template>
  <div class="ui-panel">
    <div class="ui-panel-header">
      <p class="ui-panel-header__text">{{ title }}</p>
      <DotsMenu
        v-if="menuOptions.length"
        :options="menuOptions"
        @menu-item-clicked="$emit('menu-item-clicked', $event)"
      />
    </div>
    <v-sheet class="ui-panel__body" :style="bodyCssVars">
      <slot />
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/palette.scss';

.ui-panel {
  display: flex;
  flex-direction: column;
  height: v-bind(height);
  padding: 8px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $dark-1;
    border-bottom: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 5px 10px;
    background-color: $dark-2;

    &__text {
      font-size: 16px;
      font-weight: 500;
    }
  }

  &__body {
    flex: 1;
    overflow: auto;
    border: 1px solid $dark-1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: var(--padding);
  }
}
</style>
