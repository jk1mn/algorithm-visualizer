import { LocalStorageKey } from '@/utils/constants';
import { LocalStorage } from '@/shared/local-storage';

import type { Theme } from '../model/definitions';

export class SetThemeCase {
  execute (theme: Theme): void {
    LocalStorage.set(LocalStorageKey.DEFAULT_THEME, theme);
  }
}
