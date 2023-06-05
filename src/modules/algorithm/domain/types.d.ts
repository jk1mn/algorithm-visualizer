import { AlgorithmType } from './constants';
import type { SearchNumberInput } from './dto/input/search-number-input';
import type { SearchNumberPayload } from './dto/step/search-number-payload';
import type { SortNumericArrayInput } from './dto/input/sort-numeric-array-input';
import type { SortNumericArrayPayload } from './dto/step/sort-numeric-array-payload';

type PayloadsMap = {
  [AlgorithmType.BinarySearch]: SearchNumberPayload;
  [AlgorithmType.BubbleSort]: SortNumericArrayPayload;
};

type InputDataMap = {
  [AlgorithmType.BinarySearch]: SearchNumberInput;
  [AlgorithmType.BubbleSort]: SortNumericArrayInput;
};

export type PayloadType<T extends AlgorithmType> = PayloadsMap[T];

export type InputDataType<T extends AlgorithmType> = InputDataMap[T];

export type LinesRange = Array<number|string>;
