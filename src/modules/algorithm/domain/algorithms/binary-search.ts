import { middle, range } from '@/utils/arrays';
import { addSuffix } from '@/utils/numericSuffix';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import { Step } from '@/modules/algorithm/domain/algorithms/solution/step';
import { Algorithm } from '@/modules/algorithm/domain/algorithms/algoithm';
import type { Solution } from '@/modules/algorithm/domain/algorithms/solution/solution';
import { SearchNumberPayload } from '@/modules/algorithm/domain/dto/step/search-number-payload';
import type { SearchNumberInput } from '@/modules/algorithm/domain/dto/input/search-number-input';

export class BinarySearch extends Algorithm<AlgorithmType.BinarySearch> {
  solve(input: SearchNumberInput): Solution<AlgorithmType.BinarySearch> {
    let start = 0;
    let end = input.numbers.length - 1;

    while (start < end) {
      const mid = middle(start, end);
      const indexes = range(start, end);

      const stepPayload = new SearchNumberPayload(indexes, [mid]);

      this.solution.addStep(
        new Step<AlgorithmType.BinarySearch>(
          `The middle of the list is the ${addSuffix(mid)} element.`,
          stepPayload
        )
      );

      if (input.numbers[mid] === input.target) {
        break;
      }

      if (input.numbers[mid] > input.target) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return this.solution;
  }
}
