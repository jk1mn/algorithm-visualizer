import { middle, range } from '@/utils/arrays';
import { addSuffix } from '@/utils/numeric-suffix';
import { Algorithm, Solution } from '@/modules/algorithm-visualization';
import type { SearchAlgorithmStep, SearchAlgorithmInput } from '@/modules/algorithm-visualization';

export class BinarySearch extends Algorithm {
  constructor (solution: Solution) {
    super(solution);
  }

  solve (input: SearchAlgorithmInput): Solution {
    let start = 0;
    let end = input.array.length - 1;

    while (start <= end) {
      const mid = middle(start, end);
      const highlightedIndexes = range(start, end);

      this.addStep(<SearchAlgorithmStep>{
        log: `The middle of the array is the ${addSuffix(mid)} element. Compare it with the target`,
        highlightedIndexes,
        currentIndex: mid,
        highlightedCodeLines: [7],
      });

      if (input.array[mid] === input.target) {
        this.addStep(<SearchAlgorithmStep>{
          log: `The target is found, return index ${mid}`,
          highlightedIndexes,
          indexSuccess: mid,
          highlightedCodeLines: ['9-11'],
        });

        return this.solution;
      }

      if (input.array[mid] > input.target) {
        end = mid - 1;

        this.addStep(<SearchAlgorithmStep>{
          log: `The middle element is greater than the target, so keep seaching on the left side`,
          highlightedIndexes: range(start, end),
          highlightedCodeLines: [13, 14],
        });
      } else {
        start = mid + 1;

        this.addStep(<SearchAlgorithmStep>{
          log: `The middle element is less than the target, so keep seaching on the right side`,
          highlightedIndexes: range(start, end),
          highlightedCodeLines: [15, 16],
        });
      }
    }

    this.addStep(<SearchAlgorithmStep>{
      log: `The array doesn't contain the target, return -1`,
      highlightedCodeLines: [20],
    });

    return this.solution;
  }
}
