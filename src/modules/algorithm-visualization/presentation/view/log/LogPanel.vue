<script setup lang="ts">
import { computed } from 'vue';

import Panel from '@/components/ui/panel/Panel.vue';
import { useThemeProvider } from '@/modules/theme';

import panelTheme from './theme';

defineProps<{
  logs: string[];
}>();

const theme = useThemeProvider();

const themedStyle = computed(() => theme.getThemedStyles(panelTheme));
</script>

<template>
  <Panel title="Logs" :style="themedStyle">
    <v-list class="logs">
      <v-list-item
        v-for="(log, index) in logs"
        :key="index"
        v-html="log"
        class="logs__item"
      />
    </v-list>
  </Panel>
</template>

<style lang="scss" scoped>
.logs {
  height: 100%;
  padding: 0;
  margin: 0;
}

.logs__item {
  display: flex;
  gap: 4px;
  padding: 0.5rem 1rem;
  border-top: 1px solid var(--log-border-color);
  font-size: 0.94em;
  line-height: 1rem;

  &:first-child {
    border: none;
  }
}
</style>
