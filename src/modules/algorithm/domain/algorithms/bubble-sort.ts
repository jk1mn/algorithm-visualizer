import { swap } from '@/utils/arrays';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import { Algorithm } from '@/modules/algorithm/domain/algorithms/algoithm';
import { Step } from '@/modules/algorithm/domain/algorithms/solution/step';
import type { Solution } from '@/modules/algorithm/domain/algorithms/solution/solution';
import { SortNumericArrayPayload } from '@/modules/algorithm/domain/dto/step/sort-numeric-array-payload';
import type { SortNumericArrayInput } from '@/modules/algorithm/domain/dto/input/sort-numeric-array-input';

export class BubbleSort extends Algorithm<AlgorithmType.BubbleSort> {
  solve(input: SortNumericArrayInput): Solution<AlgorithmType.BubbleSort> {
    const array = [...input.numbers];

    let lastUnsortedIndex = array.length - 1;
    let comparingItems, swapped;

    for (let i = 0; i < array.length - 1; i++) {
      swapped = false;

      for (let j = 0; j < array.length - i - 1; j++) {
        comparingItems = [j, j + 1];

        const payload = new SortNumericArrayPayload(
          lastUnsortedIndex,
          [],
          comparingItems
        );

        this.solution.addStep(
          new Step(`Comparing ${array[j]} and ${array[j + 1]}`, payload)
        );

        if (array[j] > array[j + 1]) {
          const payload = new SortNumericArrayPayload(
            lastUnsortedIndex,
            comparingItems,
            comparingItems
          );

          this.solution.addStep(
            new Step(`Swapping ${array[j]} and ${array[j + 1]}`, payload)
          );

          swap(array, j + 1, j);
          swapped = true;
        }
      }

      lastUnsortedIndex--;

      this.solution.addStep(
        new Step(
          'Mark the element as sorted',
          new SortNumericArrayPayload(lastUnsortedIndex)
        )
      );

      if (!swapped) {
        break;
      }
    }

    this.solution.addStep(new Step('The array is sorted'));

    return this.solution;
  }
}
