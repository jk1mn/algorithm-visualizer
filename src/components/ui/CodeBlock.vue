<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

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
  Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
    'remove-initial-line-feed': false,
  });

  highlight();
});

watch(() => props.highlightedLines, (current: LinesRange, previous: LinesRange) => {
  if (previous.length) {
    const prevLines = preElement.value?.querySelectorAll(`.line-highlight[data-range]`);
    prevLines?.forEach(line => {
      line.remove();
    });
  }

  const highlightLines = Prism.plugins.lineHighlight.highlightLines(preElement.value, current.join());
  highlightLines();
});

watch(() => props.code, () => {
  nextTick(highlight);
});

function highlight () {
  codeElement.value && Prism.highlightElement(codeElement.value);
}
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
  padding: 1rem;

  .line-highlight {
    margin-top: 1rem;
  }
}
</style>
