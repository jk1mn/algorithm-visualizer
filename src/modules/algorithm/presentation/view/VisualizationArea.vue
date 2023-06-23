<script setup lang="ts" generic="T extends AlgorithmType">
import Panel from '@/components/ui/Panel.vue';

import ToolBar from './ToolBar.vue';
import type { PreviewType } from '../../domain/types';
import type { InputDataType } from '../../domain/types';
import type { AlgorithmType } from '../../domain/constants';
import type { Step } from '../../domain/algorithms/solution/step';

defineEmits<{
  (e: 'back'): void;
  (e: 'forward'): void;
  (e: 'play'): void;
  (e: 'pause'): void;
}>();

defineProps<{
  previewComponent: PreviewType<T>;
  playing: boolean;
  inputData: InputDataType<T>;
  steps: Step<T>[],
  position: number,
  algorithm: string,
}>();
</script>

<template>
  <Panel :title="algorithm">
    <v-sheet class="visualize-area">
      <component
        :is="previewComponent"
        :input="inputData"
        :steps="steps"
        :position="position"
      />
    </v-sheet>
    <v-sheet
      class="visualize-current-action"
      v-html="steps[position]?.log"
    />
    <ToolBar
      :playing="playing"
      @back="$emit('back')"
      @forward="$emit('forward')"
      @play="$emit('play')"
      @pause="$emit('pause')"
    />
  </Panel>
</template>

<style lang="scss" scoped>
.visualize-area {
  height: calc(100% - 40px - 36px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.visualize-current-action {
  height: 36px;
  padding: 0.5rem;
  text-align: center;
}
</style>
