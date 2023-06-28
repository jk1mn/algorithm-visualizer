import type { LocalStorageKey } from '../utils/constants';

export class LocalStorage {
  static get(key: LocalStorageKey): unknown | null {
    const data = localStorage.getItem(key);
    return data && JSON.parse(data);
  }

  static set(key: LocalStorageKey, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static remove(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}
