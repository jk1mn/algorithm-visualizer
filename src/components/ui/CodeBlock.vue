<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

import type { LinesRange } from '@/modules/algorithm/domain/types';

const props = withDefaults(defineProps<{
  language?: string;
  code: string;
  highlightedLines?: LinesRange;
}>(), {
  language: 'javascript',
  highlightedLines: () => [],
});

const preElement = ref<HTMLElement>();
const codeElement = ref<Element>();

onMounted(() => {
  Prism.highlightElement(codeElement.value!);
});

watch(() => props.highlightedLines, (current: LinesRange, previous: LinesRange) => {
    if (previous.length) {
      const prevLines = preElement.value?.querySelector(`.line-highlight[data-range="${previous.join()}"]`);
      prevLines?.remove();
    }

    const highlightLines = Prism.plugins.lineHighlight.highlightLines(preElement.value, current.join());
    highlightLines();
});
</script>

<template>
  <pre
    ref="preElement"
    class="line-numbers"
    :data-line="highlightedLines.join()"
  >
    <code
      ref="codeElement"
      :class="`language-${language}`"
    >
      {{ code }}
    </code>
  </pre>
</template>

<style lang="scss">
pre[data-line] {
  height: 100%;
  margin: 0;
  padding: 0 1rem;

  .line-highlight {
    margin-top: 0;
  }
}
</style>
