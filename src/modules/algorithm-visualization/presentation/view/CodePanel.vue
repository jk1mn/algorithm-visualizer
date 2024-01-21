<script setup lang="ts">
import Panel from '@/components/ui/panel/Panel.vue';
import CodeBlock from '@/components/ui/CodeBlock.vue';
import { AlgorithmType } from '@/modules/algorithm';

import * as Code from '../../domain/model/code';

withDefaults(defineProps<{
  algorithmType: AlgorithmType;
  highlightedLines?: Array<number | string>,
}>(), {
  highlightedLines: () => [],
});
</script>

<template>
  <Panel title="Implementation">
    <CodeBlock
      :code="Code[algorithmType]"
      :highlighted-lines="highlightedLines"
    />
  </Panel>
</template>

<style lang="scss" scoped>
</style>
