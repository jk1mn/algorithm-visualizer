<script setup lang="ts">
import Button from '@/components/ui/Button.vue';

defineEmits<{
  (e: 'cancel'): void;
  (e: 'submit'): void;
  (e: 'use-default'): void;
}>();

withDefaults(defineProps<{
  visible: boolean;
}>(), {
  visible: false,
});
</script>

<template>
  <teleport to="body">
    <Transition name="slide" >
      <div v-if="visible" class="edit-layout-panel">
        <Button @click="$emit('cancel')">Cancel</Button>
        <Button @click="$emit('submit')">Save</Button>
        <Button @click="$emit('use-default')">Use Default</Button>
      </div>
    </Transition>
  </teleport>
</template>

<style lang="scss" scoped>
@import '@/assets/css/palette.scss';

.slide-enter-active,
.slide-leave-active {
  transition: transform .3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(60px);
}

.edit-layout-panel {
  position: fixed;
  bottom: 0;
  width: 100%;  
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 10px 15px;
  background-color: $dark-2;
  border-top: 1px solid $dark-1;
}
</style>
