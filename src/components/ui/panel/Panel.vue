<script setup lang="ts">
import { computed } from 'vue';

import { useThemeProvider } from '@/modules/theme';
import type { MenuOption } from '@/modules/algorithm/presentation/constants';

import DotsMenu from '../DotsMenu.vue';
import type { MenuOptions } from '../types';
import panelTheme from './theme';

defineEmits<{
  (e: 'menu-item-clicked', value: MenuOption): void;
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

const theme = useThemeProvider();

const themedStyle = computed(() => theme.getThemedStyles(panelTheme));
</script>

<template>
  <v-sheet class="ui-panel" color="surface" :style="themedStyle">
    <div class="ui-panel-header">
      <p class="ui-panel-header__text">{{ title }}</p>

      <div class="ui-panel-header__actions">
        <slot name="actions" />

        <DotsMenu
          v-if="menuOptions.length"
          :options="menuOptions"
          @menu-item-clicked="$emit('menu-item-clicked', $event as MenuOption)"
        />
      </div>
    </div>
    <div class="ui-panel__body" :style="bodyCssVars">
      <slot />
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
.ui-panel {
  display: flex;
  flex-direction: column;
  height: v-bind(height);

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--panel-border-color);
    border-bottom: none;
    border-top-left-radius: var(--gap-sm);
    border-top-right-radius: var(--gap-sm);
    padding: var(--gap-sm) var(--gap-lg);

    &__text {
      font-weight: 400;
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: var(--gap-xs);
    }
  }

  &__body {
    flex: 1;
    overflow: hidden;
    border: 1px solid var(--panel-border-color);
    border-bottom-left-radius: var(--gap-sm);
    border-bottom-right-radius: var(--gap-sm);
    padding: var(--padding);
    position: relative;
  }
}
</style>
