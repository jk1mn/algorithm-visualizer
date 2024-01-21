import { AlgorithmType } from '@/modules/algorithm';
import {
  type InputData,
  InputDataSource,
  type SearchAlgorithmInput,
  type SortingAlgorithmInput,
  VISUALIZATION_MAX_ELEMENT_VALUE,
  VISUALIZATION_MAX_ITEMS_LENGTH,
  VISUALIZATION_MIN_ITEMS_LENGTH,
} from '@/modules/algorithm-visualization';
import { randomNumber } from '@/utils/number';
import { randomNumbers, randomSortedList } from '@/utils/arrays';
import { UserException } from '@/shared/exceptions';

export class GetAlgorithmInputDataCase {
  execute (type: AlgorithmType, source: InputDataSource): InputData {
    switch (source) {
      case InputDataSource.Random:
        switch (type) {
          case AlgorithmType.BinarySearch:
            return this.getBinarySearchInput();
          case AlgorithmType.BubbleSort:
            return this.getSortingInput();
        }
    }

    throw new UserException('Can not generate input data');
  }

  private getBinarySearchInput (): SearchAlgorithmInput {
    const array = randomSortedList(VISUALIZATION_MIN_ITEMS_LENGTH, VISUALIZATION_MAX_ITEMS_LENGTH);

    return {
      array,
      target: randomNumber(array[0], array[array.length - 1]),
    };
  }

  private getLinearSearchInput (): SearchAlgorithmInput {
    const array = randomNumbers(VISUALIZATION_MIN_ITEMS_LENGTH, VISUALIZATION_MAX_ITEMS_LENGTH, VISUALIZATION_MAX_ELEMENT_VALUE);

    return {
      array,
      target: randomNumber(array[0], array[array.length - 1]),
    };
  }

  private getSortingInput (): SortingAlgorithmInput {
    return {
      array: randomNumbers(VISUALIZATION_MIN_ITEMS_LENGTH, VISUALIZATION_MAX_ITEMS_LENGTH, VISUALIZATION_MAX_ELEMENT_VALUE),
    };
  }
}
