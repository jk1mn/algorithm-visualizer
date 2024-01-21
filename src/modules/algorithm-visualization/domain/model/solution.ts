import type { Step } from '@/modules/algorithm-visualization';

export class Solution {
  readonly steps: Step[] = [];

  constructor (readonly isDetailed: boolean) {
    this.steps.push({});
  }

  addStep (step: Step) {
    this.steps.push(step);
  }
}
