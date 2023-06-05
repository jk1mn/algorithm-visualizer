<script setup lang="ts">
import CodeBlock from '@/components/ui/CodeBlock.vue';

withDefaults(defineProps<{
  code: string;
  highlightedLines?: Array<number|string>,
}>(), {
  highlightedLines: () => [],
});
</script>

<template>
  <div class="alorithm-script">
    <div class="alorithm-script__container">
      <CodeBlock
        :code="code"
        :highlighted-lines="highlightedLines"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alorithm-script {
  overflow: hidden;
  border-radius: 1rem;

  &__container {
    // height: 200px;
    // padding: 1rem 0;
    margin: 0;
    // overflow-y: auto;
  }
}
</style>
