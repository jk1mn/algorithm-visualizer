import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import { Step } from '@/modules/algorithm/domain/algorithms/solution/step';

export class Solution<T extends AlgorithmType> {
  readonly steps: Step<T>[];

  constructor() {
    this.steps = [new Step<T>('')];
  }

  addStep(step: Step<T>) {
    this.steps.push(step);
  }
}
