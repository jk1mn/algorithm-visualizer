import { Payload } from './payload';

export class SearchNumberPayload extends Payload {
  readonly highlightedIndexes: number[];
  readonly processedIndexes: number[];

  constructor(highlightedIndexes: number[], processedIndexes: number[]) {
    super();
    this.highlightedIndexes = highlightedIndexes;
    this.processedIndexes = processedIndexes;
  }
}
