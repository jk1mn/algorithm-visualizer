import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import { Step } from '@/modules/algorithm/domain/algorithms/solution/step';

export class Solution<T extends AlgorithmType> {
  readonly steps: Step<T>[];
  readonly script: string;

  constructor(script: string) {
    this.steps = [new Step<T>('')];
    this.script = script;
  }

  addStep(step: Step<T>) {
    this.steps.push(step);
  }
}
