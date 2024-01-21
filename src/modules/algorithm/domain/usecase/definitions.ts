import type { AlgorithmCategoryType, AlgorithmType, AlgorithmCategory } from '@/modules/algorithm';

import type { Algorithm as BaseAlgorithm } from '../model/definitions';

export interface GetAlgorithmsInput {
  search?: string,
  categoryTypes?: AlgorithmCategoryType[],
  types?: AlgorithmType[],
}

export type Algorithm = Omit<BaseAlgorithm, 'categoryTypes'> & {
  categories: AlgorithmCategory[];
};
