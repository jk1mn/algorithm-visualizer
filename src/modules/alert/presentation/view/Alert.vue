<script setup lang="ts">
import type { Alert } from '@/modules/alert/domain/types';

defineProps<{
  alert: Alert;
}>();
</script>

<template>
  <v-alert
    :type="alert.type"
    :title="alert.title"
    :text="alert.message"
    :closable="alert.closable"
    rounded
    position="static"
    width="100%"
    class="alert"
  />
</template>
