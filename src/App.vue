<script setup lang="ts">
import Navigation from '@/components/layout/Navigation.vue';
</script>

<template>
  <v-app color="blue-grey-darken-2">
    <Navigation />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
