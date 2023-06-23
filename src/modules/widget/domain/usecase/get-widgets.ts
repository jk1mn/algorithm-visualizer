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
        width: 8,
        height: 3,
      }),
      [WidgetType.LOG]: new Widget({
        x: 0,
        y: 3,
        width: 5,
        height: 2,
      }),
      [WidgetType.FORM]: new Widget({
        x: 5,
        y: 3,
        width: 3,
        height: 2,
      }),
      [WidgetType.SCRIPT]: new Widget({
        x: 8,
        y: 0,
        width: 4,
        height: 5,
      }),
    };
  }
}
