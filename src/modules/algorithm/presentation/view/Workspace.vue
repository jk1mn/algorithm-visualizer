<script setup lang="ts">
import type { Component } from 'vue';

import Log from './Log.vue';
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

function inputGenerated(input: InputDataType<AlgorithmType>) {
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
    <v-row>
      <v-col>
        <h2>{{ header }}</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col :cols="7">
        <template v-if="previewComponent && viewModel.input.value">
          <component
            :is="previewComponent"
            :input="viewModel.input.value"
            :steps="viewModel.solution.value?.steps"
            :position="viewModel.position.value"
          />
          <div>
            {{ viewModel.solution.value?.steps[viewModel.position.value]?.log }}
          </div>
          <ToolBar
            :playing="viewModel.playing.value"
            @back="back"
            @forward="forward"
            @play="play"
            @pause="pause"
          />
        </template>
      </v-col>

      <v-spacer></v-spacer>

      <v-col :cols="4">
        <v-sheet width="300" class="mx-auto">
          <component
            v-if="formComponent"
            :is="formComponent"
            @input-generated="inputGenerated"
          />
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col :cols="7">
        <Log :logs="viewModel.logs.value" />
      </v-col>
    </v-row>
  </v-container>
</template>
