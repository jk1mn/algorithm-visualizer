<script setup lang="ts">
import Navigation from '@/components/layout/Navigation.vue';
import AlertProvider from '@/modules/alert/presentation/view/AlertProvider.vue';
import eventBus, { Event } from '@/shared/event-bus';

eventBus.on((event, payload) => {
  if (event === Event.Fullscreen) {
    document.querySelector<HTMLElement>('html')!.style.overflow = payload ? 'hidden' : '';
  }
});
</script>

<template>
  <v-app>
    <Navigation />

    <v-main>
      <router-view />
    </v-main>

    <AlertProvider />
  </v-app>
</template>
