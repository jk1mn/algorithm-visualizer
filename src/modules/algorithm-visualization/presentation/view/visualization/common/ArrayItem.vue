<script setup lang="ts">
defineProps<{
  value: number;
  height: number;
}>();
</script>

<template>
  <li
    class="array-list__item"
    :style="{
        height: `${height}px`,
      }"
  >
    {{ value }}
  </li>
</template>

<style scoped lang="scss">
.array-list__item {
  display: flex;
  flex-flow: column-reverse;
  background-color: var(--blue-1);
  padding-left: 1px;
  padding-right: 1px;
  border: 1px solid var(--black);
  text-align: center;
  transition: height 0.5s;
  min-width: 1.2rem;
  width: 2rem;
  flex: 1 1;
}
</style>
