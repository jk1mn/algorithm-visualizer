<script setup lang="ts" generic="T extends AlgorithmType">
import Panel from '@/components/ui/Panel.vue';
import type { AlgorithmType } from '../../domain/constants';
import type { InputDataType, FormType } from '../../domain/types';

defineEmits<{
  (e: 'input-generated', input: InputDataType<T>): void;
}>();

defineProps<{
  formComponent: FormType<T>;
}>();
</script>

<template>
  <Panel title="Generate Data">
    <v-sheet class="form-container">
      <component
        :is="formComponent"
        @input-generated="$emit('input-generated', $event)"
      />
    </v-sheet>
  </Panel>
</template>

<style lang="scss" scoped>
.form-container {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
