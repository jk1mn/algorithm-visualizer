import { describe, it, expect } from 'vitest';

import { BinarySearch, Solution } from '@/modules/algorithm-visualization';

describe('BinarySearch', () => {
  it('executes algorithm', () => {
    const algorithm = new BinarySearch(new Solution(true));
    const solution = algorithm.solve({
      array: [0, 5, 6, 9, 23, 45, 675765, 9999999],
      target: 45,
    });

    expect(solution.steps).toHaveLength(4);
  });
});
