import { swap } from '@/utils/arrays';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import { Algorithm } from '@/modules/algorithm/domain/algorithms/algoithm';
import { Step } from '@/modules/algorithm/domain/algorithms/solution/step';
import type { Solution } from '@/modules/algorithm/domain/algorithms/solution/solution';
import { SortNumericArrayPayload } from '@/modules/algorithm/domain/dto/step/sort-numeric-array-payload';
import type { SortNumericArrayInput } from '@/modules/algorithm/domain/dto/input/sort-numeric-array-input';
import script from '@/modules/algorithm/domain/algorithms/scripts/bubble-sort';

export class BubbleSort extends Algorithm<AlgorithmType.BubbleSort> {
  constructor() {
    super(script);
  }

  solve(input: SortNumericArrayInput): Solution<AlgorithmType.BubbleSort> {
    const array = [...input.numbers];

    let lastUnsortedIndex = array.length - 1;
    let comparingItems, swapped;

    for (let i = 0; i < array.length - 1; i++) {
      swapped = false;

      this.solution.addStep(
        new Step(
          'Set the <b>swapped</b> flag to false',
          new SortNumericArrayPayload({
            lastUnsortedIndex,
            highlightedCodeLines: [6],
          }),
        ),
      );

      for (let j = 0; j < array.length - i - 1; j++) {
        comparingItems = [j, j + 1];

        this.solution.addStep(
          new Step(
            `Comparing ${array[j]} and ${array[j + 1]}. If ${array[j]} > ${array[j + 1]} swap them`,
            new SortNumericArrayPayload({
              lastUnsortedIndex,
              highlightedIndexes: comparingItems,
              highlightedCodeLines: [9],
            }),
          ),
        );

        if (array[j] > array[j + 1]) {
          this.solution.addStep(
            new Step(
              `Swap ${array[j]} and ${array[j + 1]} and set <b>swapped</b> to true`,
              new SortNumericArrayPayload({
                lastUnsortedIndex,
                changes: comparingItems,
                highlightedIndexes: comparingItems,
                highlightedCodeLines: ['10-13'],
              }),
            ),
          );

          swap(array, j + 1, j);
          swapped = true;
        }
      }

      lastUnsortedIndex--;

      this.solution.addStep(
        new Step(
          'The element is sorted. At least one swap is done in this iteration, continue',
          new SortNumericArrayPayload({ lastUnsortedIndex, highlightedCodeLines: [17] })
        )
      );

      if (!swapped) {
        this.solution.addStep(
          new Step(
            'There are no swaps in this iteration. The script completed',
            new SortNumericArrayPayload({ lastUnsortedIndex, highlightedCodeLines: [18] })
          )
        );

        break;
      }
    }

    this.solution.addStep(new Step('The array is sorted', new SortNumericArrayPayload({ lastUnsortedIndex: -1 })));

    return this.solution;
  }
}
