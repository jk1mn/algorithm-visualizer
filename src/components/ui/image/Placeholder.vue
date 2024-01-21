<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  width?: string,
  height?: string,
  loading?: boolean,
}>(), {
  width: '100%',
  height: '100%',
  loading: false,
});

const style = computed<Record<string, string>>(() => ({
  width: props.width,
  height: props.height,
}));
</script>

<template>
  <div class="img-placeholder" :style="style">
    {{ loading || 'Image not found' }}
  </div>
</template>

<style scoped lang="scss">
.img-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--grey-1);
}
</style>
