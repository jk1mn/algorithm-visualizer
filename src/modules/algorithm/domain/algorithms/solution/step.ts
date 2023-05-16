import type { PayloadType } from '@/modules/algorithm/domain/types';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';

export class Step<T extends AlgorithmType> {
  readonly log: string;
  readonly payload: PayloadType<T> | undefined;

  constructor(log: string, payload?: PayloadType<T>) {
    this.log = log;
    this.payload = payload;
  }
}
