<script setup lang="ts">
import Panel from '@/components/ui/Panel.vue';
import CodeBlock from '@/components/ui/CodeBlock.vue';

withDefaults(defineProps<{
  code: string;
  highlightedLines?: Array<number|string>,
}>(), {
  highlightedLines: () => [],
});
</script>

<template>
  <Panel title="Implementation">
    <CodeBlock
      :code="code"
      :highlighted-lines="highlightedLines"
    />
  </Panel>
</template>

<style lang="scss" scoped>
</style>
