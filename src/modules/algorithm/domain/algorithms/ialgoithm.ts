import type { InputDataType } from '@/modules/algorithm/domain/types';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import type { Solution } from '@/modules/algorithm/domain/algorithms/solution/solution';

export interface IAlgorithm<T extends AlgorithmType> {
  solve(input: InputDataType<T>): Solution<T>;
}
