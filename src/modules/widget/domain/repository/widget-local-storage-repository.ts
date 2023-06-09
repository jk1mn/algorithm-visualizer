import { Widget } from "../entity/widget";
import type { IWidgetRepository } from "./irepository";
import { LocalStorage } from '@/shared/local-storage';
import { LocalStorageKey } from '@/utils/constants';
import { WidgetType } from "../../constants";
import type { Widgets } from "../../types";
import { AppException } from "../../../../shared/exceptions";

export class WidgetLocalStorageRepository implements IWidgetRepository {
  getWidgets(): Widgets {
    const data = LocalStorage.get(LocalStorageKey.WIDGET) as Widgets;

    if (!data) throw new AppException();

    return {
      [WidgetType.LOG]: new Widget(data[WidgetType.LOG]),
      [WidgetType.FORM]: new Widget(data[WidgetType.FORM]),
      [WidgetType.SCRIPT]: new Widget(data[WidgetType.SCRIPT]),
      [WidgetType.VISUALIZATION]: new Widget(data[WidgetType.VISUALIZATION]),
    };
  }

  setWidgets(widgets: Widgets): void {
    LocalStorage.set(LocalStorageKey.WIDGET, widgets);
  }

  clearWidgets(): void {
    LocalStorage.remove(LocalStorageKey.WIDGET);
  }
}
