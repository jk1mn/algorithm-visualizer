import type { IWidgetRepository } from "../repository/irepository";
import type { Widgets } from "../../types";

export class SaveWidgetsCase {
  private repository: IWidgetRepository;

  constructor (repository: IWidgetRepository) {
    this.repository = repository;
  }

  execute (widgets: Widgets) {
    this.repository.setWidgets(widgets);
  }
}
