import { describe, it, expect } from 'vitest';

import { BubbleSort, Solution } from '@/modules/algorithm-visualization';

describe('BubbleSort', () => {
  it('executes algorithm', () => {
    const algoithm = new BubbleSort(new Solution(true));
    const solution = algoithm.solve({
      array: [16, 4, 23, 42, 8, 15],
    });

    expect(solution.steps).toHaveLength(31);
  });
});
