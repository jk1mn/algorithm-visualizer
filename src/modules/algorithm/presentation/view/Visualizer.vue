<script setup lang="ts">
import type { Component } from 'vue';

import Workspace from './Workspace.vue';
import { ViewModel } from '../view-model';
import { Facade } from '../../domain/facade';
import type { AlgorithmType } from '../../domain/constants';

defineProps<{
  header: string;
  algorithmType: AlgorithmType;
  formComponent: Component | null;
  previewComponent: Component | null;
}>();

const viewModel = new ViewModel<AlgorithmType>(new Facade());
</script>

<template>
  <Workspace
    :header="header"
    :algorithm-type="algorithmType"
    :form-component="formComponent"
    :preview-component="previewComponent"
    :view-model="viewModel"
  />
</template>
