<script setup lang="ts">
defineEmits<{
  (e: 'click'): void;
}>();

defineProps<{
  to: string;
}>();
</script>

<template>
  <router-link class="ui-app-link" :to="to">
    <slot />
  </router-link>
</template>

<style lang="scss" scoped>
.ui-app-link {
  display: inline-block;
  text-decoration: none;
  color: #000;
}
</style>
