import { Payload } from './payload';

export class SortNumericArrayPayload extends Payload {
  readonly lastUnsortedIndex: number;
  readonly changes: number[] | undefined;
  readonly highlightedIndexes: number[] | undefined;

  constructor(
    lastUnsortedIndex: number,
    changes?: number[],
    highlightedIndexes?: number[]
  ) {
    super();
    this.changes = changes;
    this.highlightedIndexes = highlightedIndexes;
    this.lastUnsortedIndex = lastUnsortedIndex;
  }
}
