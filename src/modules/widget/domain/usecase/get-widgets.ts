import type { IWidgetRepository } from "../repository/irepository";
import { Widget } from "../entity/widget";
import { WidgetType } from "../../constants";
import type { Widgets } from "../../types";

export class GetWidgetsCase {
  private repository: IWidgetRepository;

  constructor (repository: IWidgetRepository) {
    this.repository = repository;
  }

  execute (): Widgets {
    try {
      return this.repository.getWidgets();
    } catch {
      return this.getDefaults();
    }
  }

  getDefaults () {
    return {
      [WidgetType.VISUALIZATION]: new Widget({
        x: 0,
        y: 0,
        w: 8,
        h: 3,
        id: WidgetType.VISUALIZATION,
      }),
      [WidgetType.LOG]: new Widget({
        x: 0,
        y: 3,
        w: 5,
        h: 2,
        id: WidgetType.LOG,
      }),
      [WidgetType.FORM]: new Widget({
        x: 5,
        y: 3,
        w: 3,
        h: 2,
        id: WidgetType.FORM,
      }),
      [WidgetType.SCRIPT]: new Widget({
        x: 8,
        y: 0,
        w: 4,
        h: 5,
        id: WidgetType.SCRIPT,
      }),
    };
  }
}
