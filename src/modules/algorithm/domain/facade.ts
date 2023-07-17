import { Factory } from '@/modules/algorithm/domain/factory';
import type { InputDataType } from '@/modules/algorithm/domain/types';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import type { Solution } from '@/modules/algorithm/domain/algorithms/solution/solution';

export class Facade {
  getSolution<T extends AlgorithmType>(
    type: T,
    input: InputDataType<T>
  ): Solution<T> {
    const algorithm = Factory.getAlgorithm<T>(type);

    return algorithm.solve(input);
  }

  getRandomInput<T extends AlgorithmType>(type: T): InputDataType<T> {
    const algorithm = Factory.getAlgorithm<T>(type);

    return algorithm.getRandomInput();
  }
}
