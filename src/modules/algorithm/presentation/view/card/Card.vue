<script setup lang="ts">
import { computed } from 'vue';
import { type RouteLocationRaw } from 'vue-router';

import { useThemeProvider } from '@/modules/theme';
import Image from '@/components/ui/image/Image.vue';
import type { Algorithm, AlgorithmComplexity } from '@/modules/algorithm';

import cardTheme from './theme';
import Category from '../category/Category.vue';
import Complexity from '../Complexity.vue';

const props = defineProps<{
  algorithm: Algorithm,
}>();

const url = computed<RouteLocationRaw>(() => ({
  name: 'algorithm',
  params: {
    name: props.algorithm.slug,
  },
}));

const complexity = computed<[string, AlgorithmComplexity][]>(() => [
  ['Time Complexity', props.algorithm.timeComplexity],
  ['Space Complexity', props.algorithm.spaceComplexity],
]);

const theme = useThemeProvider();

const themedStyle = computed(() => theme.getThemedStyles(cardTheme));
</script>

<template>
  <v-card
    class="algorithm-card"
    :to="url"
    :ripple="false"
    :style="themedStyle"
  >
    <template #title>
      <v-card-title class="algorithm-card__title">
        {{ algorithm.name }}
      </v-card-title>
    </template>

    <Image :src="algorithm.img" :alt="algorithm.name" :height="167" :width="100" />

    <table class="algorithm-card-complexity">
      <tr class="algorithm-card-complexity__item" v-for="[name, value] in complexity" :key="name">
        <td>{{ name }}</td>
        <td>
          <Complexity :value="value" />
        </td>
      </tr>
    </table>

    <template #actions>
      <div class="algorithm-card__categories">
        <Category
          v-for="category in algorithm.categories"
          :key="category.type"
          :name="category.name"
          :type="category.type"
        />
      </div>
    </template>
  </v-card>
</template>

<style scoped lang="scss">
.algorithm-card {
  min-width: 190px;
  max-width: 320px;
  height: 340px;
  flex: 1;
  border: 1px solid var(--alg-card-border-color);
  border-radius: var(--gap-lg);

  &__title {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.75rem !important;
  }

  &-complexity {
    list-style: none;
    padding: var(--gap-lg) var(--gap-lg) var(--gap-md);
    font-size: 0.875rem;

    &__item {
      line-height: 1rem;
    }

    tr td:first-child {
      padding-right: var(--gap-xl);
    }

    tr + tr td {
      padding-top: var(--gap-md);
    }
  }

  &__categories {
    padding-right: var(--gap-md);
    padding-left: var(--gap-md);
    overflow-x: auto;
  }
}
</style>
