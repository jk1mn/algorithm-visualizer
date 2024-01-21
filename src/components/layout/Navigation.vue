<script setup lang="ts">
import { SetThemeButton } from '@/modules/theme';

import AppLink from '../ui/AppLink.vue';
</script>

<template>
  <v-app-bar app color="background" absolute>
    <v-app-bar-title>
      <AppLink
        to="/"
        class="header__link"
      >
        Algorithm Visualizer
      </AppLink>
    </v-app-bar-title>

    <SetThemeButton />
  </v-app-bar>
</template>

<style lang="scss" scoped>
.header {
  &__link {
    padding: 1.1rem 0.5rem;

    &_active {
      font-weight: 700;
    }
  }
}
</style>
