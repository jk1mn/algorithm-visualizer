<script setup lang="ts">
import { computed } from 'vue';

import { useAlertStore } from '@/modules/alert/store';
import type { Alert } from '@/modules/alert/domain/types';

import AlertItem from './Alert.vue';

const store = useAlertStore();

const alerts = computed<Alert[]>(() => store.alerts);
</script>

<template>
  <transition-group tag="div" name="alert" class="alerts">
    <template v-for="alert in alerts" :key="alert.id">
      <component
        v-if="alert.component"
        :is="alert.component"
        :alert="alert"
        class="alerts__item"
      />
      <AlertItem
        v-else
        :alert="alert"
        class="alerts__item"
      />
    </template>
  </transition-group>
</template>

<style lang="scss" scoped>
.alerts {
  position: fixed;
  bottom: 0;
  left: 16px;
  right: 16px;
  max-width: 400px;

  &__item {
    margin-bottom: 16px;
  }
}

.alert-enter-active, .alert-leave-active, .alert-move {
  transition: all .3s ease;
}

.alert-enter-from {
  transform: translateY(130%);
  opacity: 1;
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>
