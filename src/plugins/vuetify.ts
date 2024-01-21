import { createVuetify, type ThemeDefinition } from 'vuetify';

import { GetThemeCase } from '@/modules/theme';

const defaultTheme = new GetThemeCase().execute();

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#222',
    surface: '#414141',
    primary: '#339DFF',
    secondary: '#ABABAB',
    error: '#FF1B1B',
    info: '#EAEAEA',
    success: '#2FC117',
    warning: '#FF8A00',
  },
};

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#fff',
    surface: '#F3F3F3',
    primary: '#339DFF',
    secondary: '#ABABAB',
    error: '#FF1B1B',
    info: '#EAEAEA',
    success: '#2FC117',
    warning: '#FF8A00',
  },
};

export default createVuetify({
  theme: {
    defaultTheme,
    themes: {
      dark,
      light,
    },
  },
});
