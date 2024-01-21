<script setup lang="ts">
import { nextTick, onMounted, ref, watch, computed } from 'vue';
import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

import { useThemeProvider } from '@/modules/theme';
import type { HighlightedCodeLines } from '@/modules/algorithm-visualization';

const props = withDefaults(defineProps<{
  language?: string;
  code: string;
  highlightedLines?: HighlightedCodeLines;
}>(), {
  language: 'javascript',
  highlightedLines: () => [],
});

const theme = useThemeProvider();
const themeClass = computed(() => `theme-${theme.currentTheme.toLowerCase()}`);

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

watch(() => props.highlightedLines, (current: HighlightedCodeLines, previous: HighlightedCodeLines) => {
  if (previous.length) {
    const prevLines = preElement.value?.querySelectorAll(`.line-highlight[data-range]`);
    prevLines?.forEach(line => {
      line.remove();
    });
  }

  if (current.length) {
    const highlightLines = Prism.plugins.lineHighlight.highlightLines(preElement.value, current.join());
    highlightLines();
  }
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
    :class="themeClass"
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
@use 'sass:meta';

//todo: load themes lazily
.theme-dark {
  @include meta.load-css('prismjs/themes/prism-tomorrow.css');
}

.theme-light {
  @include meta.load-css('prismjs/themes/prism.css');
}

pre[data-line] {
  height: 100%;
  margin: 0;
  padding: 1rem;

  .line-highlight {
    margin-top: 1rem;
  }
}
</style>
