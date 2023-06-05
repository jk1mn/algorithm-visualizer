import { Payload } from './payload';

import type { LinesRange } from '@/modules/algorithm/domain/types';

type StepPayload = {
  lastUnsortedIndex: number,
  changes?: number[],
  highlightedIndexes?: number[],
  highlightedCodeLines?: LinesRange,
};

export class SortNumericArrayPayload extends Payload {
  readonly lastUnsortedIndex: number;
  readonly changes: number[] | undefined;
  readonly highlightedIndexes: number[] | undefined;

  constructor({
    lastUnsortedIndex,
    changes,
    highlightedIndexes,
    highlightedCodeLines,
  }: StepPayload) {
    super();
    this.changes = changes;
    this.highlightedIndexes = highlightedIndexes;
    this.lastUnsortedIndex = lastUnsortedIndex;
    this.highlightedCodeLines = highlightedCodeLines;
  }
}
