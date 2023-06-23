<script setup lang="ts">
import { ref, watch } from 'vue';
import Prism, { type Grammar } from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

import type { LinesRange } from '@/modules/algorithm/domain/types';

const props = withDefaults(defineProps<{
  language?: string;
  code: string;
  highlightedLines?: LinesRange,
}>(), {
  language: 'javascript',
  highlightedLines: () => [],
});

const prismLanguage: Grammar = Prism.languages[props.language];

const codeHtml = ref<string>(Prism.highlight(props.code, prismLanguage, props.language));
const pre = ref<HTMLElement>();

watch(() => props.highlightedLines, (current: LinesRange, previous: LinesRange) => {
    if (previous.length) {
      const prevLines = pre.value?.querySelector(`.line-highlight[data-range="${previous.join()}"]`);
      prevLines?.remove();
    }

    const highlightLines = Prism.plugins.lineHighlight.highlightLines(pre.value, current.join());
    highlightLines();
});
</script>

<template>
  <pre
    ref="pre"
    class="line-numbers"
    :data-line="highlightedLines.join()"
  >
    <code v-html="codeHtml" :class="`language-${language}`" />
  </pre>
</template>

<style lang="scss">
pre[data-line] {
  height: 100%;
  margin: 0;
  padding: 0 1rem;
}
</style>
