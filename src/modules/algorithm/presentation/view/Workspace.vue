<script setup lang="ts" generic="T extends AlgorithmType">
import { onBeforeMount } from 'vue';

import Grid from '@/components/ui/Grid.vue';
import GridItem from '@/components/ui/GridItem.vue';
import type { Widgets } from '@/modules/widget/types';
import { WidgetType } from '@/modules/widget/constants';
import { getRandomList } from '@/modules/algorithm/utility/random';
import { SortNumericArrayInput } from '@/modules/algorithm/domain/dto/input/sort-numeric-array-input';

import Log from './Log.vue';
import Script from './Script.vue';
import type { ViewModel } from '../view-model';
import VisualizationArea from './VisualizationArea.vue';
import type { AlgorithmType } from '../../domain/constants';
import DataGenerator from './DataGenerator.vue';
import type { InputDataType, PreviewType, FormType } from '../../domain/types';

const props = defineProps<{
  header: string;
  algorithmType: T;
  formComponent: FormType<T> | null;
  previewComponent: PreviewType<T> | null;
  loadingPreview: boolean;
  loadingForm: boolean;
  viewModel: ViewModel<T>;
  widgets: Widgets | null;
}>();

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

onBeforeMount(() => {
  generateSolution(new SortNumericArrayInput(getRandomList()));
});
</script>

<template>
  <v-container>
    <Grid
      v-if="widgets"
      class="visualize-container"
    >
      <GridItem
        :x-coordinate="widgets[WidgetType.VISUALIZATION].x"
        :y-coordinate="widgets[WidgetType.VISUALIZATION].y"
        :width="widgets[WidgetType.VISUALIZATION].width"
        :height="widgets[WidgetType.VISUALIZATION].height"
        :id="WidgetType.VISUALIZATION"
        :loading="loadingPreview"
      >
        <VisualizationArea
          :preview-component="previewComponent"
          :playing="viewModel.playing.value"
          :input-data="viewModel.input.value!"
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
        :width="widgets[WidgetType.LOG].width"
        :height="widgets[WidgetType.LOG].height"
        :id="WidgetType.LOG"
      >
        <Log :logs="viewModel.logs.value" />
      </GridItem>

      <GridItem
        :x-coordinate="widgets[WidgetType.FORM].x"
        :y-coordinate="widgets[WidgetType.FORM].y"
        :width="widgets[WidgetType.FORM].width"
        :height="widgets[WidgetType.FORM].height"
        :id="WidgetType.FORM"
        :loading="loadingForm"
      >
        <DataGenerator
          :form-component="formComponent"
          @input-generated="generateSolution"
        />
      </GridItem>

      <GridItem
        :x-coordinate="widgets[WidgetType.SCRIPT].x"
        :y-coordinate="widgets[WidgetType.SCRIPT].y"
        :width="widgets[WidgetType.SCRIPT].width"
        :height="widgets[WidgetType.SCRIPT].height"
        :id="WidgetType.SCRIPT"
      >
        <Script
          v-if="viewModel.solution.value"
          :code="viewModel.solution.value.script"
          :highlighted-lines="viewModel.solution.value?.steps[viewModel.position.value]?.payload?.highlightedCodeLines || []"
        />
      </GridItem>
    </Grid>
  </v-container>
</template>

<style lang="scss" scoped>
.visualize-container {
  font-size: 14px;
}
</style>
