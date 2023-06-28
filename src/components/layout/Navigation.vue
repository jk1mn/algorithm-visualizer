<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import Button from '../ui/Button.vue';
import AppLink from '../ui/AppLink.vue';

import algorithmRoutes from '@/router/algorithm-routes';
import { useWidgetStore } from '@/modules/widget/store';

const route = useRoute();
const store = useWidgetStore();

const isAlgPage = computed(() => route.name === 'algorithm');

const showDrawer = ref<boolean>(false);
</script>

<template>
  <v-app-bar
    app
  >
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="showDrawer = !showDrawer"
    />
    <v-app-bar-title>
      <AppLink
        to="/"
        class="header__link"
      >
        Algorithm Visualizer
      </AppLink>
    </v-app-bar-title>

    <v-spacer />

    <Button
      v-if="isAlgPage"
      variant="outlined"
      color="white"
      @click="store.setIsEditing(true)"
    >
      Edit Grid
    </Button>
  </v-app-bar>

  <v-navigation-drawer
    v-model="showDrawer"
    left
    temporary
  >
    <v-list>
      <v-list-item
        v-for="alg in algorithmRoutes"
        :key="alg.type"
      >
        <v-list-item-title>
          <AppLink :to="alg.url" class="nav__link">{{ alg.name }}</AppLink>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.header {
  &__link {
    padding: 1.1rem 0.5rem;
    color: #fff;

    &:hover {
      background-color: #424242;
    }

    &:focus {
      color: #BDBDBD;
      outline: none;
    }
  }
}

.nav {
  &__link {
    color: #fff;
    font-size: 14px;

    &:hover {
      color: #90A4AE;
    }

    &:active {
      color: #ECEFF1;
    }

    &:focus {
      color: #78909C;
      text-decoration: underline;
      outline: none;
    }
  }
}
</style>
