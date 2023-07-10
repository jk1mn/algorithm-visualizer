<script setup lang="ts" generic="T extends AlgorithmType">
import Panel from '@/components/ui/Panel.vue';

import type { AlgorithmType } from '../../domain/constants';
import type { InfoComponent } from '../../domain/types';

defineProps<{
  component: InfoComponent<T> | null;
}>();
</script>

<template>
  <Panel title="Info" with-padding>
    <component v-if="component" :is="component" />
  </Panel>
</template>

<style lang="scss" scoped>
:deep(.ui-panel__body) {
  * + * {
    margin-top: 15px;
  }
}
</style>
