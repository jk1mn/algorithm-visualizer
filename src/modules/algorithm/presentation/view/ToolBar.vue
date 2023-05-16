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
  <v-toolbar flat>
    <v-btn icon="mdi-step-backward" @click="$emit('back')" />
    <v-btn v-show="playing" icon="mdi-pause" @click="$emit('pause')" />
    <v-btn v-show="!playing" icon="mdi-play" @click="$emit('play')" />
    <v-btn icon="mdi-step-forward" @click="$emit('forward')" />
  </v-toolbar>
</template>

<style scoped lang="scss"></style>
