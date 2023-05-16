import { InputData } from './input-data';

export class SortNumericArrayInput extends InputData {
  readonly numbers: number[];

  constructor(numbers: number[]) {
    super();
    this.numbers = numbers;
  }
}
