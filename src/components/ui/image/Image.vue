<script setup lang="ts">
import { ref } from 'vue';

import Placeholder from './Placeholder.vue';

defineProps<{
  src: string | null,
  alt?: string,
  width?: number,
  height?: number,
}>();

const loading = ref<boolean>(true);
</script>

<template>
  <img v-show="!loading" :src="src" :alt="alt" :width="width" :height="height" loading="lazy">
  <Placeholder v-if="loading || !src" :height="`${height}px`" />
</template>

<style scoped lang="scss">
</style>
