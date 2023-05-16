<script setup lang="ts">
import { ref } from 'vue';

import AppLink from '../ui/AppLink.vue';

import algorithmRoutes from '@/router/algorithm-routes';

const showDrawer = ref<boolean>(false);
</script>

<template>
  <v-app-bar app color="yellow-lighten-2">
    <v-app-bar-nav-icon variant="text" @click.stop="showDrawer = !showDrawer" />

    <v-app-bar-title>
      <AppLink to="/" class="header__link"> Algorithm Visualizer </AppLink>
    </v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="showDrawer" left temporary>
    <v-list>
      <v-list-item v-for="alg in algorithmRoutes" :key="alg.type">
        <v-list-item-title>
          <router-link :to="alg.url">{{ alg.name }}</router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.header {
  &__link {
    padding: 20px 10px;

    &:hover {
      background-color: #FFF9C4;
    }
  }
}
</style>
