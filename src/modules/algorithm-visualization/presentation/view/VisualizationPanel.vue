<script setup lang="ts">
import { type ComponentPublicInstance, ref, onMounted, computed, watch, nextTick } from 'vue';
import { useResizeObserver } from '@vueuse/core';

import Panel from '@/components/ui/panel/Panel.vue';
import Button from '@/components/ui/Button.vue';
import { InputData, Step } from '@/modules/algorithm-visualization';
import eventBus, { Event } from '@/shared/event-bus';
import { round } from '@/utils/number';

import ToolBar from './toolbar/VisualizationToolBar.vue';
import { menuOptions } from '../../../algorithm/presentation/constants';
import type { MenuOption } from '../../../algorithm/presentation/constants';

defineEmits<{
  (e: 'back'): void;
  (e: 'forward'): void;
  (e: 'play'): void;
  (e: 'pause'): void;
  (e: 'menu-item-clicked', value: MenuOption): void;
  (e: 'toggle-expand', expanded: boolean): void;
  (e: 'scale', value: number): void;
}>();

const props = defineProps<{
  previewComponent: ComponentPublicInstance;
  playing: boolean;
  inputData: InputData;
  steps: Step[];
  position: number;
  algorithm: string;
  expanded: boolean;
  scale: number;
}>();

const fullscreen = ref<boolean>(false);

function toggleFullscreen (enabled: boolean) {
  fullscreen.value = enabled;
  eventBus.emit(Event.Fullscreen, enabled);
}

const component = ref<ComponentPublicInstance | null>(null);
const visualizeContainer = ref<HTMLElement | null>(null);
const transformScale = ref<number>(0);
const translateX = ref<number>(0);

const transform = computed(() => ({
  '--scale': `${transformScale.value}`,
  '--translate-x': `${translateX.value}px`,
}));

let scaleFrom = props.scale;

onMounted(() => {
  useResizeObserver(visualizeContainer, () => {
    handleVisualizationResize();
  });
});

watch(() => props.scale, () => {
  handleVisualizationResize(300);
});

watch(() => props.inputData, () => {
  nextTick(() => handleVisualizationResize());
});

let animationRequestId = 0;

function handleVisualizationResize (animationDuration = 0) {
  cancelAnimationFrame(animationRequestId);

  const elementWidth = component.value!.scalableElement.scrollWidth;

  let start = 0;

  animationRequestId = requestAnimationFrame(function animate (time) {
    if (!start) {
      start = time;
      animationRequestId = requestAnimationFrame(animate);
      return;
    }

    let progress = animationDuration ? (time - start) / animationDuration : 1;
    if (progress > 1) {
      progress = 1;
    }

    const scaleDiff = props.scale - scaleFrom;
    const stepScale = scaleDiff ? (scaleFrom + scaleDiff * progress) : scaleFrom;

    const stepWidth = elementWidth * stepScale;

    transformScale.value = round(stepScale);
    translateX.value = stepWidth >= visualizeContainer.value!.clientWidth
      ? 0
      : round((visualizeContainer.value!.clientWidth - stepWidth) / 2);

    if (progress < 1) {
      animationRequestId = requestAnimationFrame(animate);
    } else {
      scaleFrom = props.scale;
    }
  });
}
</script>

<template>
  <Panel
    class="visualize-panel"
    :class="{ 'visualize-panel_fullscreen': fullscreen }"
    :style="transform"
    :title="algorithm"
    :menu-options="menuOptions"
    @menu-item-clicked="$emit('menu-item-clicked', $event)"
  >
    <template #actions>
      <Button v-if="fullscreen" icon="mdi-fullscreen-exit" @click="toggleFullscreen(false)" />
      <Button v-else icon="mdi-fullscreen" @click="toggleFullscreen(true)" />
      <template v-if="!fullscreen">
        <Button v-if="expanded" icon="mdi-arrow-collapse" @click="$emit('toggle-expand', false)" />
        <Button v-else icon="mdi-arrow-expand" @click="$emit('toggle-expand', true)" />
      </template>
    </template>

    <div class="visualize">
      <div class="visualize-container" ref="visualizeContainer">
        <v-sheet class="visualize__area">
          <component
            ref="component"
            class="visualize__component"
            :is="previewComponent"
            :input="inputData"
            :steps="steps"
            :position="position"
          />
        </v-sheet>
      </div>
      <ToolBar
        :playing="playing"
        :scale="scale"
        @back="$emit('back')"
        @forward="$emit('forward')"
        @play="$emit('play')"
        @pause="$emit('pause')"
        @scale="$emit('scale', $event)"
      />
    </div>
  </Panel>
</template>

<style lang="scss" scoped>
.visualize {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: var(--gap-sm);
  padding-left: var(--gap-sm);

  &-panel {
    &_fullscreen {
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      padding: 0;
    }
  }

  &-container {
    overflow: auto;
    height: 100%;
  }

  &__component {
    transform: translateX(var(--translate-x)) scale(var(--scale));
    transform-origin: 0 center;
    transition: transform 0.5s;
  }

  &__area {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: var(--gap-sm);
    overflow: auto;
  }
}
</style>
