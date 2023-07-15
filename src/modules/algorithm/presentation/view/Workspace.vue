<script setup lang="ts" generic="T extends AlgorithmType">
import { computed } from 'vue';

import Grid from '@/components/ui/grid/Grid.vue';
import GridItem from '@/components/ui/GridItem.vue';
import type { Widgets } from '@/modules/widget/types';
import { WidgetType } from '@/modules/widget/constants';
import type { GridEventBus } from '@/components/ui/grid/event-bus';

import Log from './Log.vue';
import InfoPanel from './InfoPanel.vue';
import Script from './Script.vue';
import type { ViewModel } from '../view-model';
import VisualizationArea from './VisualizationArea.vue';
import type { AlgorithmType } from '../../domain/constants';
import DataGenerator from './DataGenerator.vue';
import type { InputDataType, PreviewType, FormType, InfoComponent } from '../../domain/types';

const props = defineProps<{
  header: string;
  algorithmType: T;
  formComponent: FormType<T> | null;
  previewComponent: PreviewType<T> | null;
  infoComponent: InfoComponent<T> | null;
  loading: boolean;
  viewModel: ViewModel<T>;
  widgets: Widgets | null;
  isEditingGrid: boolean;
  gridEventBus: GridEventBus;
}>();

const widgetItems = computed(() => props.widgets ? Object.values(props.widgets) : []);

function generateSolution(input: InputDataType<T>) {
  props.viewModel.generateSolution(props.algorithmType, input);
}

function play() {
  props.viewModel.play();
}

function pause() {
  props.viewModel.pause();
}

function back() {
  props.viewModel.toPrevStep();
}

function forward() {
  props.viewModel.toNextStep();
}
</script>

<template>
  <v-container>
    <Grid
      v-if="widgets"
      class="visualize-container"
      :layout="widgetItems"
      :editing="isEditingGrid"
      :event-bus="gridEventBus"
    >
      <GridItem
        :x-coordinate="widgets[WidgetType.VISUALIZATION].x"
        :y-coordinate="widgets[WidgetType.VISUALIZATION].y"
        :width="widgets[WidgetType.VISUALIZATION].w"
        :height="widgets[WidgetType.VISUALIZATION].h"
        :id="WidgetType.VISUALIZATION"
        :loading="loading"
      >
        <VisualizationArea
          v-if="viewModel.input.value"
          :preview-component="previewComponent"
          :playing="viewModel.playing.value"
          :input-data="viewModel.input.value"
          :steps="viewModel.solution.value?.steps || []"
          :position="viewModel.position.value"
          :algorithm="header"
          @back="back"
          @forward="forward"
          @play="play"
          @pause="pause"
        />
      </GridItem>

      <GridItem
        :x-coordinate="widgets[WidgetType.LOG].x"
        :y-coordinate="widgets[WidgetType.LOG].y"
        :width="widgets[WidgetType.LOG].w"
        :height="widgets[WidgetType.LOG].h"
        :id="WidgetType.LOG"
      >
        <Log :logs="viewModel.logs.value" />
      </GridItem>

      <GridItem
        :x-coordinate="widgets[WidgetType.FORM].x"
        :y-coordinate="widgets[WidgetType.FORM].y"
        :width="widgets[WidgetType.FORM].w"
        :height="widgets[WidgetType.FORM].h"
        :id="WidgetType.FORM"
        :loading="loading"
      >
        <DataGenerator
          :form-component="formComponent"
          @input-generated="generateSolution"
        />
      </GridItem>

      <GridItem
        :x-coordinate="widgets[WidgetType.SCRIPT].x"
        :y-coordinate="widgets[WidgetType.SCRIPT].y"
        :width="widgets[WidgetType.SCRIPT].w"
        :height="widgets[WidgetType.SCRIPT].h"
        :id="WidgetType.SCRIPT"
      >
        <Script
          v-if="viewModel.solution.value"
          :code="viewModel.solution.value.script"
          :highlighted-lines="viewModel.solution.value?.steps[viewModel.position.value]?.payload?.highlightedCodeLines || []"
        />
      </GridItem>

      <GridItem
        :x-coordinate="widgets[WidgetType.INFO].x"
        :y-coordinate="widgets[WidgetType.INFO].y"
        :width="widgets[WidgetType.INFO].w"
        :height="widgets[WidgetType.INFO].h"
        :id="WidgetType.INFO"
      >
        <InfoPanel :component="infoComponent" />
      </GridItem>
    </Grid>
  </v-container>
</template>

<style lang="scss" scoped>
.visualize-container {
  font-size: 14px;
}
</style>
