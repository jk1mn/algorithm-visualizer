import { LocalStorageKey } from '@/utils/constants';
import { LocalStorage } from '@/shared/local-storage';
import { enumSchema } from '@/shared/validation-rules';

import { Theme } from '../model/definitions';
import { getThemePreference } from '../utility';

export class GetThemeCase {
  execute (): Theme {
    try {
      return <Theme>enumSchema(Theme)
        .parse(LocalStorage.get(LocalStorageKey.DEFAULT_THEME));
    } catch {
      return getThemePreference() || Theme.Dark;
    }
  }
}
