<script setup lang="ts">
import Skeleton from './Skeleton.vue';

defineEmits<{
  (e: 'click'): void;
}>();

withDefaults(defineProps<{
  xCoordinate: number;
  yCoordinate: number;
  width: number;
  height: number;
  id: string;
  loading?: boolean;
}>(), {
  loading: false,
});
</script>

<template>
  <div
    class="grid-stack-item"
    :gs-x="xCoordinate"
    :gs-y="yCoordinate"
    :gs-w="width"
    :gs-h="height"
    :gs-id="'grid-item-' + id"
  >
    <Skeleton v-if="loading" />
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<style lang="scss" scoped>
</style>
