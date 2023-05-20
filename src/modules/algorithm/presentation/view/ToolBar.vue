<script setup lang="ts">
defineEmits<{
  (e: 'back'): void;
  (e: 'forward'): void;
  (e: 'play'): void;
  (e: 'pause'): void;
}>();

defineProps<{
  playing: boolean;
}>();
</script>

<template>
  <v-toolbar
    class="visualizer-toolbar"
    flat
    tag="div"
    height="40"
  >
    <v-btn
      size="x-small"
      icon="mdi-step-backward"
      @click="$emit('back')"
    />
    <v-btn
      v-show="playing"
      size="x-small"
      icon="mdi-pause"
      @click="$emit('pause')"
    />
    <v-btn
      v-show="!playing"
      size="x-small"
      icon="mdi-play"
      @click="$emit('play')"
    />
    <v-btn
      size="x-small"
      icon="mdi-step-forward"
      @click="$emit('forward')"
    />
  </v-toolbar>
</template>

<style scoped lang="scss">
.visualizer-toolbar {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  margin-bottom: 1.5rem;

  :deep(.v-toolbar__content) {
    justify-content: center;
  }
}
</style>
