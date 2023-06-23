<script setup lang="ts" generic="T extends AlgorithmType">
import Workspace from './Workspace.vue';
import { ViewModel } from '../view-model';
import { Facade } from '../../domain/facade';
import type { AlgorithmType } from '../../domain/constants';
import type { PreviewType, FormType } from '../../domain/types';
import type { Widgets } from '@/modules/widget/types';

defineProps<{
  header: string;
  algorithmType: T;
  formComponent: FormType<T> | null;
  previewComponent: PreviewType<T> | null;
  loadingPreview: boolean;
  loadingForm: boolean;
  widgets: Widgets | null;
}>();

const viewModel = new ViewModel<T>(new Facade());
</script>

<template>
  <Workspace
    :header="header"
    :algorithm-type="algorithmType"
    :form-component="formComponent"
    :preview-component="previewComponent"
    :view-model="viewModel"
    :loading-preview="loadingPreview"
    :loading-form="loadingForm"
    :widgets="widgets"
  />
</template>
