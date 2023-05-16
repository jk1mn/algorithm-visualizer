import { InputData } from './input-data';

export class SearchNumberInput extends InputData {
  numbers: number[];
  target: number;

  constructor(numbers: number[], target: number) {
    super();
    this.numbers = numbers;
    this.target = target;
  }
}
