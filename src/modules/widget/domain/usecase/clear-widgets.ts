import type { IWidgetRepository } from '../repository/irepository';

export class ClearWidgetsCase {
  private repository: IWidgetRepository;

  constructor (repository: IWidgetRepository) {
    this.repository = repository;
  }

  execute () {
    this.repository.clearWidgets();
  }
}
