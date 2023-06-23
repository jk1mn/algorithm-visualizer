<script setup lang="ts">
import { onMounted } from 'vue';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

onMounted(() => {
  GridStack.init({
    float: true,
  });
});
</script>

<template>
  <div class="grid-stack">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
</style>
