import type { InputDataType } from '@/modules/algorithm/domain/types';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import type { IAlgorithm } from '@/modules/algorithm/domain/algorithms/ialgoithm';
import { Solution } from '@/modules/algorithm/domain/algorithms/solution/solution';

export abstract class Algorithm<T extends AlgorithmType> implements IAlgorithm<T>
{
  readonly solution: Solution<T>;

  constructor(script: string) {
    this.solution = new Solution<T>(script);
  }

  abstract solve(input: InputDataType<T>): Solution<T>;
}
