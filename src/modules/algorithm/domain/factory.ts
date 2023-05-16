import { AlgorithmType } from './constants';
import type { IAlgorithm } from './algorithms/ialgoithm';
import { BinarySearch } from './algorithms/binary-search';
import { BubbleSort } from './algorithms/bubble-sort';

export class Factory {
  static getAlgorithm<T extends AlgorithmType>(type: T): IAlgorithm<T> {
    const algorithmsMap: {
      [T in AlgorithmType]: new () => IAlgorithm<T>;
    } = {
      [AlgorithmType.BinarySearch]: BinarySearch,
      [AlgorithmType.BubbleSort]: BubbleSort,
    };

    return new algorithmsMap[type]();
  }
}
