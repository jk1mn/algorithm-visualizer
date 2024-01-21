import { swap } from '@/utils/arrays';
import { Algorithm, Solution } from '@/modules/algorithm-visualization';
import type { SortingAlgorithmStep, SortingAlgorithmInput } from '@/modules/algorithm-visualization';

export class BubbleSort extends Algorithm {
  constructor (solution: Solution) {
    super(solution);
  }

  solve (input: SortingAlgorithmInput): Solution {
    const array = [...input.array];

    let lastUnsortedIndex = array.length - 1;
    let comparingItems, swapped;

    for (let i = 0; i < array.length - 1; i++) {
      swapped = false;

      this.addStep(<SortingAlgorithmStep>{
        log: 'Set the <b>swapped</b> flag to false',
        lastUnsortedIndex,
        highlightedCodeLines: [6],
      });

      for (let j = 0; j < array.length - i - 1; j++) {
        comparingItems = [j, j + 1];

        this.addStep(<SortingAlgorithmStep>{
          log: `Comparing ${array[j]} and ${array[j + 1]}. If ${array[j]} > ${array[j + 1]} swap them`,
          lastUnsortedIndex,
          highlightedIndexes: comparingItems,
          highlightedCodeLines: [9],
        });

        if (array[j] > array[j + 1]) {
          this.addStep(<SortingAlgorithmStep>{
            log: `Swap ${array[j]} and ${array[j + 1]} and set <b>swapped</b> to true`,
            lastUnsortedIndex,
            changes: comparingItems,
            highlightedIndexes: comparingItems,
            highlightedCodeLines: ['10-13'],
          });

          swap(array, j + 1, j);
          swapped = true;
        }
      }

      lastUnsortedIndex--;

      this.addStep(<SortingAlgorithmStep>{
        log: 'The element is sorted. At least one swap is done in this iteration, continue',
        lastUnsortedIndex,
        highlightedCodeLines: [17],
      });

      if (!swapped) {
        this.addStep(<SortingAlgorithmStep>{
          log: 'There are no swaps in this iteration. The script completed',
          lastUnsortedIndex,
          highlightedCodeLines: [18],
        });

        break;
      }
    }

    this.addStep(<SortingAlgorithmStep>{
      log: 'The array is sorted',
      lastUnsortedIndex: -1,
    });

    return this.solution;
  }
}
