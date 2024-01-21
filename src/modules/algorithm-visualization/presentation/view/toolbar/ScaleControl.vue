<script setup lang="ts">
defineEmits<{
  (e: 'change', value: number): void;
}>();

defineProps<{
  scale: number;
}>();
</script>

<template>
  <v-slider
    class="scale-control"
    :model-value="scale"
    :step="0.1"
    :min="0.5"
    :max="2"
    :thumb-size="10"
    append-icon="mdi-magnify-plus-outline"
    :ripple="false"
    :track-size="2"
    @update:model-value="$emit('change', $event)"
  />
</template>

<style scoped lang="scss">
.scale-control {
  height: 32px;
}
</style>
