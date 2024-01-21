<script setup lang="ts">
import {
  GetAlgorithmInputDataCase,
  GetAlgorithmVisualizationCase,
  VisualizationViewModel,
} from '@/modules/algorithm-visualization';
import { AlgorithmType } from '@/modules/algorithm';

import VisualizationWorkspace from './VisualizationWorkspace.vue';

defineProps<{
  header: string;
  algorithmType: AlgorithmType;
}>();

const viewModel = new VisualizationViewModel(new GetAlgorithmVisualizationCase(), new GetAlgorithmInputDataCase());
</script>

<template>
  <VisualizationWorkspace
    :header="header"
    :algorithm-type="algorithmType"
    :view-model="viewModel"
  />
</template>
