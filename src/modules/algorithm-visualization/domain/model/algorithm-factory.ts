import { AlgorithmType } from '@/modules/algorithm';
import {
  Solution,
  BinarySearch,
  BubbleSort,
} from '@/modules/algorithm-visualization';

import type { IAlgorithm } from './algorithm';

export class AlgorithmFactory {
  static getAlgorithm (type: AlgorithmType, isDetailedSolution: boolean): IAlgorithm {
    const solution = new Solution(isDetailedSolution);

    switch (type) {
      case AlgorithmType.BubbleSort:
        return new BubbleSort(solution);
      case AlgorithmType.BinarySearch:
        return new BinarySearch(solution);
    }
  }
}
