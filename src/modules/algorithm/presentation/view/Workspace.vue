<script setup lang="ts">
import { type Component, onBeforeMount } from 'vue';

import { getRandomList } from '@/modules/algorithm/utility/random';
import { SortNumericArrayInput } from '@/modules/algorithm/domain/dto/input/sort-numeric-array-input';

import Log from './Log.vue';
import Script from './Script.vue';
import ToolBar from './ToolBar.vue';
import type { ViewModel } from '../view-model';
import type { InputDataType } from '../../domain/types';
import type { AlgorithmType } from '../../domain/constants';

const props = defineProps<{
  header: string;
  algorithmType: AlgorithmType;
  formComponent: Component | null;
  previewComponent: Component | null;
  viewModel: ViewModel<AlgorithmType>;
}>();

function generateSolution(input: InputDataType<AlgorithmType>) {
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
    <v-row>
      <v-col>
        <h2>{{ header }}</h2>
      </v-col>
    </v-row>

    <v-row class="visualize-container">
      <v-col cols="12" md="7" class="flex-column">
        <template v-if="previewComponent && viewModel.input.value">
          <v-sheet height="220" class="visualize-area">
            <component
              :is="previewComponent"
              :input="viewModel.input.value"
              :steps="viewModel.solution.value?.steps"
              :position="viewModel.position.value"
            />
          </v-sheet>
          <v-sheet
            class="visualize-current-action"
            v-html="viewModel.solution.value?.steps[viewModel.position.value]?.log"
          />
          <ToolBar
            :playing="viewModel.playing.value"
            @back="back"
            @forward="forward"
            @play="play"
            @pause="pause"
          />
          <Log :logs="viewModel.logs.value" />
        </template>
      </v-col>

      <v-col md="4" cols="12" class="flex-column">
        <v-sheet
          min-height="100"
          class="mx-auto form-container"
        >
          <component
            v-if="formComponent"
            :is="formComponent"
            @input-generated="generateSolution"
          />
        </v-sheet>
        <Script
          v-if="viewModel.solution.value"
          :code="viewModel.solution.value.script"
          :highlighted-lines="viewModel.solution.value?.steps[viewModel.position.value]?.payload?.highlightedCodeLines || []"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.visualize-container {
  font-size: 14px;
}

.visualize-area {
  display: flex;
  align-items: end;
  justify-content: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  overflow-x: auto;
}

.visualize-current-action {
  height: 36px;
  padding: 0.5rem;
  text-align: center;
}

.form-container {
  display: flex;
  align-items: center;
  border-radius: 1rem;
}
</style>
