import { Theme } from './model/definitions';

export function getThemePreference (): Theme | null {
  if (!window) return null;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.Dark
    : Theme.Light;
}
