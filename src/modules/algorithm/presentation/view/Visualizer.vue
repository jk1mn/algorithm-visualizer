<script setup lang="ts" generic="T extends AlgorithmType">
import Workspace from './Workspace.vue';
import { ViewModel } from '../view-model';
import { Facade } from '../../domain/facade';
import type { AlgorithmType } from '../../domain/constants';
import type { PreviewType, FormType, InfoComponent } from '../../domain/types';
import type { Widgets } from '@/modules/widget/types';
import type { GridEventBus } from '@/components/ui/grid/event-bus';

defineProps<{
  header: string;
  algorithmType: T;
  formComponent: FormType<T> | null;
  previewComponent: PreviewType<T> | null;
  infoComponent: InfoComponent<T> | null;
  loading: boolean;
  widgets: Widgets | null;
  isEditingGrid: boolean;
  gridEventBus: GridEventBus;
}>();

const viewModel = new ViewModel<T>(new Facade());
</script>

<template>
  <Workspace
    :header="header"
    :algorithm-type="algorithmType"
    :form-component="formComponent"
    :preview-component="previewComponent"
    :info-component="infoComponent"
    :view-model="viewModel"
    :loading="loading"
    :widgets="widgets"
    :is-editing-grid="isEditingGrid"
    :grid-event-bus="gridEventBus"
  />
</template>
