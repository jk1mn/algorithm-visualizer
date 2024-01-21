<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import { SetThemeCase, Theme, useThemeProvider } from '@/modules/theme';

const theme = useThemeProvider();
const usecase = new SetThemeCase();

function toggleTheme () {
  const newTheme = theme.currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;

  theme.currentTheme = newTheme;
  usecase.execute(newTheme);
}
</script>

<template>
  <Button icon="mdi-theme-light-dark" @click="toggleTheme" />
</template>
