<script setup lang="ts">
import { ref, computed } from 'vue';

defineSlots<{
  item (props: { value: number, height: number, index: number }): any;
}>();

const props = defineProps<{
  values: number[];
}>();

const maxValue = computed(() => Math.max(...props.values));

const maxItemHeight = 180;
const minItemHeight = maxItemHeight * 0.2;

const listElement = ref<HTMLElement | null>(null);

defineExpose({
  listElement,
});
</script>

<template>
  <ul class="array-list" ref="listElement">
    <slot
      name="item"
      v-for="(num, index) in values"
      :key="index"
      :value="num"
      :index="index"
      :height="minItemHeight + (num * (maxItemHeight - minItemHeight)) / maxValue"
    />
  </ul>
</template>

<style scoped lang="scss">
.array-list {
  display: flex;
  align-items: flex-end;
  gap: var(--gap-md);
  font-size: 0.8em;
  max-width: 100%;
  height: 180px;

  :first-child {
    margin-left: auto;
  }

  :last-child {
    margin-right: auto;
  }
}
</style>
