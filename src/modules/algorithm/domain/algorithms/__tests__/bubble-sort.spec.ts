import { describe, it, expect } from 'vitest';

import { BubbleSort } from '@/modules/algorithm/domain/algorithms/bubble-sort';
import { SortNumericArrayInput } from '@/modules/algorithm/domain/dto/input/sort-numeric-array-input';

describe('BubbleSort', () => {
  it("returns element's index", () => {
    const algoithm = new BubbleSort();
    const solution = algoithm.solve(
      new SortNumericArrayInput([16, 4, 23, 42, 8, 15])
    );

    expect(solution.steps).toHaveLength(7);
  });
});
