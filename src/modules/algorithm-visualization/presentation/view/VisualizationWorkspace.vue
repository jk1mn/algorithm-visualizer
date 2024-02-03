<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';

import { AlgorithmType } from '@/modules/algorithm';
import { VisualizationViewModel } from '@/modules/algorithm-visualization';

import LogPanel from '@/modules/algorithm-visualization/presentation/view/log/LogPanel.vue';
import CodePanel from './CodePanel.vue';
import InfoPanel from './InfoPanel.vue';
import { MenuOption } from '../../../algorithm/presentation/constants';
import VisualizationPanel from './VisualizationPanel.vue';
import * as Visualization from './visualization';

const props = defineProps<{
  header: string;
  algorithmType: AlgorithmType;
  viewModel: VisualizationViewModel;
}>();

function play () {
  props.viewModel.play();
}

function pause () {
  props.viewModel.pause();
}

function back () {
  props.viewModel.toPrevStep();
}

function forward () {
  props.viewModel.toNextStep();
}

function scale (value: number) {
  props.viewModel.setScale(value);
}

function handleVisualizePanelMenuClick (event: MenuOption) {
  switch (event) {
    case MenuOption.RANDOMIZE:
      props.viewModel.generateRandomInput(props.algorithmType);
  }
}

let VisualizationComponent: typeof Visualization[AlgorithmType] | null = null;

watch(() => props.algorithmType, prepareVisualization);
onMounted(prepareVisualization);

function prepareVisualization () {
  props.viewModel.generateRandomInput(props.algorithmType);

  VisualizationComponent = Visualization[props.algorithmType];
}

const visualizationExpanded = ref<boolean>(false);
</script>

<template>
  <div class="algorithm" :class="{ 'algorithm_expanded': visualizationExpanded }">
    <VisualizationPanel
      v-if="viewModel.input.value"
      class="visualize-panel"
      :preview-component="VisualizationComponent!"
      :playing="viewModel.playing.value"
      :scale="viewModel.scale.value"
      :input-data="viewModel.input.value"
      :steps="viewModel.solution.value?.steps || []"
      :position="viewModel.position.value"
      :algorithm="header"
      :expanded="visualizationExpanded"
      @back="back"
      @forward="forward"
      @play="play"
      @pause="pause"
      @scale="scale"
      @menu-item-clicked="handleVisualizePanelMenuClick"
      @toggle-expand="visualizationExpanded = $event"
    />

    <CodePanel
      v-if="viewModel.solution.value"
      class="code-panel"
      :algorithm-type="algorithmType"
      :highlighted-lines="viewModel.solution.value?.steps[viewModel.position.value]?.highlightedCodeLines || []"
    />

    <LogPanel class="logs-panel" :logs="viewModel.logs.value" />

    <InfoPanel class="info-panel" :type="algorithmType" />
  </div>
</template>

<style lang="scss" scoped>
$breakpoint: 690px;

.visualize-panel {
  grid-column: span 2;

  @media (max-width: $breakpoint) {
    grid-column: span 1;
  }
}

.code-panel {
  grid-row: span 2;

  @media (max-width: $breakpoint) {
    grid-row: span 1;
  }
}

.logs-panel {
  min-height: 10rem;
}

.algorithm {
  --min-column-size-percent: 50%;

  padding: var(--gap-lg) var(--gap-xxl);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(32rem, var(--min-column-size-percent)), 1fr));
  grid-template-rows: minmax(16rem, 32rem) minmax(16rem, 22rem);
  grid-auto-rows: 22rem;
  gap: var(--gap-lg);

  &_expanded {
    --min-column-size-percent: 30%;

    grid-template-rows: 40rem minmax(16rem, 22rem);

    .visualize-panel {
      grid-column: span 3;

      @media (max-width: $breakpoint) {
        grid-column: span 1;
      }
    }

    .code-panel {
      grid-column: span 2;

      @media (max-width: $breakpoint) {
        grid-column: span 1;
      }
    }
  }

  @media (max-width: $breakpoint) {
    grid-template-columns: 100%;
    padding-left: var(--gap-md);
    padding-right: var(--gap-md);
  }
}
</style>
