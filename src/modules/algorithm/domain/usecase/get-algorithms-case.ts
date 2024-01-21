import { intersect } from '@/utils/arrays';
import type { Algorithm, AlgorithmType, GetAlgorithmsInput } from '@/modules/algorithm';

import type { Algorithm as BaseAlgorithm } from '../model/definitions';

import algorithms from '../model/algorithms';
import categories from '../model/categories';

export class GetAlgorithmsCase {
  getAll (input?: GetAlgorithmsInput): Promise<Algorithm[]> {
    const filteredAlgorithms = input
      ? algorithms.filter(
        algorithm => input.types?.includes(algorithm.type) ||
          input.categoryTypes && intersect(input.categoryTypes, algorithm.categoryTypes).length ||
          input.search && algorithm.name.toLowerCase().includes(input.search.toLowerCase()),
      )
      : algorithms;

    return Promise.resolve(filteredAlgorithms.map(algorithm => this.buildAlgorithm(algorithm)));
  }

  getOne (slug: string): Promise<Algorithm | null> {
    const algorithm = algorithms.find(algorithm => algorithm.slug === slug);

    return Promise.resolve(algorithm ? this.buildAlgorithm(algorithm) : null);
  }

  private buildAlgorithm (algorithm: BaseAlgorithm): Algorithm {
    return {
      name: algorithm.name,
      type: algorithm.type,
      slug: algorithm.slug,
      img: algorithm.img,
      timeComplexity: algorithm.timeComplexity,
      spaceComplexity: algorithm.spaceComplexity,
      categories: algorithm.categoryTypes.map(
        type => categories.find(category => category.type === type)!,
      ),
    };
  }
}
