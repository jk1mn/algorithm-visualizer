import { describe, it, expect } from 'vitest';

import { BinarySearch } from '@/modules/algorithm/domain/algorithms/binary-search';
import { SearchNumberInput } from '@/modules/algorithm/domain/dto/input/search-number-input';

describe('BinarySearch', () => {
  it("returns element's index", () => {
    const algoithm = new BinarySearch();
    const solution = algoithm.solve(
      new SearchNumberInput([0, 5, 6, 9, 23, 45, 675765, 9999999], 45)
    );

    expect(solution.steps).toHaveLength(2);
  });
});
