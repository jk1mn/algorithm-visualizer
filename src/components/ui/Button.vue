<script setup lang="ts">
defineEmits<{
  (e: 'click'): void;
}>();

withDefaults(defineProps<{
  block?: boolean;
  variant?: NonNullable<'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'>;
  color?: string;
}>(), {
  block: false,
  variant: 'elevated',
  color: 'grey-darken-2',
});
</script>

<template>
  <v-btn
    :block="block"
    :color="color"
    :variant="variant"
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>

<style lang="scss" scoped>
</style>
