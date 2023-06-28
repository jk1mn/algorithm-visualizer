import type { Widgets } from "../../types";

export interface IWidgetRepository {
  getWidgets(): Widgets | never;
  setWidgets(widgets: Widgets): void;
  clearWidgets(): void;
}
