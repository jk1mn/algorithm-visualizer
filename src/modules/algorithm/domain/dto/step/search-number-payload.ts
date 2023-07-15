import { Payload } from './payload';

import type { LinesRange } from '@/modules/algorithm/domain/types';

type StepPayload = {
  highlightedIndexes?: number[],
  currentIndex?: number,
  indexSuccess?: number,
  highlightedCodeLines?: LinesRange,
};

export class SearchNumberPayload extends Payload {
  readonly highlightedIndexes: number[] | undefined;
  readonly currentIndex: number | undefined;
  readonly indexSuccess: number | undefined;
  readonly highlightedCodeLines: LinesRange | undefined;

  constructor({
    highlightedIndexes,
    currentIndex,
    indexSuccess,
    highlightedCodeLines,
  }: StepPayload) {
    super();
    this.highlightedIndexes = highlightedIndexes;
    this.currentIndex = currentIndex;
    this.indexSuccess = indexSuccess;
    this.highlightedCodeLines = highlightedCodeLines;
  }
}
