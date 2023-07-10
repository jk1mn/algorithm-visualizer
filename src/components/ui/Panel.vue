<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  height?: string;
  title?: string;
  withPadding?: boolean;
}>(), {
  height: '100%',
  withPadding: false,
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
