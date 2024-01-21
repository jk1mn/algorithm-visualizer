import type { AlgorithmType } from '@/modules/algorithm';

export const VISUALIZATION_MIN_ITEMS_LENGTH = 5;
export const VISUALIZATION_MAX_ITEMS_LENGTH = 30;
export const VISUALIZATION_MAX_ELEMENT_VALUE = 99;

export interface AlgorithmOptions {
  type: AlgorithmType;
  inputData: InputData;
  detailedSolution: boolean;
}

export type HighlightedCodeLines = Array<number | string>;

export enum InputDataSource {
  Random = 'Random',
  Manual = 'Manual',
}

export interface InputData {
}

export interface SearchAlgorithmInput<T = number> extends InputData {
  array: T[];
  target: number;
}

export interface SortingAlgorithmInput<T = number> extends InputData {
  array: T[];
}

export interface Step {
  log?: string;
  highlightedCodeLines?: HighlightedCodeLines;
}

export interface SearchAlgorithmStep extends Step {
  highlightedIndexes?: number[];
  currentIndex?: number;
  indexSuccess?: number;
}

export interface SortingAlgorithmStep extends Step {
  lastUnsortedIndex: number;
  changes?: number[];
  highlightedIndexes?: number[];
}
