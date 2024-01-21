<script setup lang="ts">
import { useSlots, computed } from 'vue';
import type { VBtn } from 'vuetify/components';

defineEmits<{
  (e: 'click', value: any): void;
}>();

const props = withDefaults(defineProps<{
  primary?: boolean;
  block?: boolean;
  variant?: NonNullable<'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'>;
  color?: string;
  icon?: string;
  size?: string;
}>(), {
  block: false,
  primary: false,
});

type VBtnProps = InstanceType<typeof VBtn>['$props'];

const btnProps = computed<VBtnProps>(() => {
  const result: VBtnProps = {
    block: props.block,
    size: props.icon && !props.size ? 'x-small' : props.size,
    ripple: false,
  };

  if (props.variant) result.variant = props.variant;
  if (props.color) result.color = props.color;
  if (props.icon) {
    result.icon = props.icon;
    result.flat = true;
    result.variant = 'text';
  }

  return result;
});

const slots = useSlots();
</script>

<template>
  <v-btn
    v-if="slots.default"
    v-bind="btnProps"
    class="ui-btn"
    @click="$emit('click', $event)"
  >
    <slot />
  </v-btn>
  <v-btn
    v-else
    v-bind="btnProps"
    class="ui-btn"
    @click="$emit('click', $event)"
  />
</template>

<style lang="scss" scoped>
.ui-btn {
  font-size: 1rem;
}
</style>
