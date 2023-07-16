import { middle, range } from '@/utils/arrays';
import { addSuffix } from '@/utils/numericSuffix';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import { Step } from '@/modules/algorithm/domain/algorithms/solution/step';
import { Algorithm } from '@/modules/algorithm/domain/algorithms/algoithm';
import script from '@/modules/algorithm/domain/algorithms/scripts/binary-search';
import type { Solution } from '@/modules/algorithm/domain/algorithms/solution/solution';
import { SearchNumberPayload } from '@/modules/algorithm/domain/dto/step/search-number-payload';
import { SearchNumberInput } from '@/modules/algorithm/domain/dto/input/search-number-input';
import { getRandomTargetForSortedList, getRandomSortedList } from '@/modules/algorithm/utility/random';

export class BinarySearch extends Algorithm<AlgorithmType.BinarySearch> {
  constructor () {
    super(script);
  }

  solve(input: SearchNumberInput): Solution<AlgorithmType.BinarySearch> {
    let start = 0;
    let end = input.numbers.length - 1;

    while (start <= end) {
      const mid = middle(start, end);
      const highlightedIndexes = range(start, end);

      this.solution.addStep(
        new Step<AlgorithmType.BinarySearch>(
          `The middle of the array is the ${addSuffix(mid)} element. Compare it with the target`,
          new SearchNumberPayload({
            highlightedIndexes,
            currentIndex: mid,
            highlightedCodeLines: [7],
          }),
        ),
      );

      if (input.numbers[mid] === input.target) {
        this.solution.addStep(
          new Step<AlgorithmType.BinarySearch>(
            `The target is found, return index ${mid}`,
            new SearchNumberPayload({
              highlightedIndexes,
              indexSuccess: mid,
              highlightedCodeLines: ['9-11'],
            }),
          ),
        );

        return this.solution;
      }

      if (input.numbers[mid] > input.target) {
        end = mid - 1;

        this.solution.addStep(
          new Step<AlgorithmType.BinarySearch>(
            `The middle element is greater than the target, so keep seaching on the left side`,
            new SearchNumberPayload({
              highlightedIndexes: range(start, end),
              highlightedCodeLines: [13, 14],
            }),
          ),
        );
      } else {
        start = mid + 1;

        this.solution.addStep(
          new Step<AlgorithmType.BinarySearch>(
            `The middle element is less than the target, so keep seaching on the right side`,
            new SearchNumberPayload({
              highlightedIndexes: range(start, end),
              highlightedCodeLines: [15, 16],
            }),
          ),
        );
      }
    }

    this.solution.addStep(
      new Step<AlgorithmType.BinarySearch>(
        `The array doesn't contain the target, return -1`,
        new SearchNumberPayload({
          highlightedCodeLines: [20],
        }),
      ),
    );

    return this.solution;
  }

  getRandomInput() {
    const array = getRandomSortedList();
    const target = getRandomTargetForSortedList(array);
  
    return new SearchNumberInput(array, target);
  }
}
