import type { InputData, Solution, Step } from '@/modules/algorithm-visualization';

export interface IAlgorithm {
  solve (input: InputData): Solution;
}

export abstract class Algorithm implements IAlgorithm {
  readonly solution: Solution;

  protected constructor (solution: Solution) {
    this.solution = solution;
  }

  abstract solve (input: InputData): Solution;

  protected addStep (step: Step) {
    if (!this.solution.isDetailed) {
      delete step.log;
      delete step.highlightedCodeLines;
    }

    this.solution.addStep(step);
  }
}
