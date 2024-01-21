import { useTheme, type ThemeInstance } from 'vuetify';

import type { Theme } from '../domain/model/definitions';

class ThemeProvider {
  theme: ThemeInstance;

  constructor () {
    this.theme = useTheme();
  }

  get currentTheme (): Theme {
    return this.theme.global.name.value as Theme;
  }

  set currentTheme (theme: Theme) {
    this.theme.global.name.value = theme;
  }

  getThemedStyles (themes: Record<Theme, Record<string, string | number>>) {
    return themes[this.currentTheme];
  }
}

export function useThemeProvider () {
  return new ThemeProvider();
}
