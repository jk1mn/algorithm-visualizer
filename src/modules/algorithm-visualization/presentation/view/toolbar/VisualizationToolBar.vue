<script setup lang="ts">
import Button from '@/components/ui/Button.vue';

import ScaleControl from './ScaleControl.vue';

defineEmits<{
  (e: 'back'): void;
  (e: 'forward'): void;
  (e: 'play'): void;
  (e: 'pause'): void;
  (e: 'scale', value: number): void;
}>();

defineProps<{
  playing: boolean;
  scale: number;
}>();
</script>

<template>
  <v-toolbar
    class="visualizer-toolbar"
    flat
    tag="div"
    height="60"
    absolute
  >
    <Button
      icon="mdi-step-backward"
      @click="$emit('back')"
    />
    <Button
      v-show="playing"
      icon="mdi-pause"
      @click="$emit('pause')"
    />
    <Button
      v-show="!playing"
      icon="mdi-play"
      @click="$emit('play')"
    />
    <Button
      icon="mdi-step-forward"
      @click="$emit('forward')"
    />

    <ScaleControl :scale="scale" @change="$emit('scale', $event)" />
  </v-toolbar>
</template>

<style scoped lang="scss">
.visualizer-toolbar {
  bottom: var(--gap-lg);
  left: 0;
  background: transparent;
  pointer-events: all;

  :deep(.v-toolbar__content) {
    justify-content: center;
    gap: var(--gap-md);
  }
}

:deep(.scale-control) {
  width: 100%;
  max-width: 10rem;
  padding-right: 1rem;

  @media (min-width: 500px) {
    position: absolute;
    right: 0;
  }
}
</style>
