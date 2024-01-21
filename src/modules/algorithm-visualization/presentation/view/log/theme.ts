import { Theme } from '@/modules/theme';

export default {
  [Theme.Dark]: {
    '--log-border-color': 'var(--dark-4)',
  },
  [Theme.Light]: {
    '--log-border-color': 'var(--grey-3)',
  },
};
