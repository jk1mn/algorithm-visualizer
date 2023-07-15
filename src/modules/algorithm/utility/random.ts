import { randomNumber } from '@/utils/number';
import { randomNumbers, randomSortedList } from '@/utils/arrays';

import {
  MAX_ARRAY_LENGTH,
  MIN_ARRAY_LENGTH,
  MAX_ELEMENT_VALUE,
} from '../domain/constants';

export const getRandomList = () => randomNumbers(MIN_ARRAY_LENGTH, MAX_ARRAY_LENGTH, MAX_ELEMENT_VALUE);

export const getRandomSortedList = () => randomSortedList(MIN_ARRAY_LENGTH, MAX_ARRAY_LENGTH);

export const getRandomTargetForSortedList = (array: number[]) => {
  return randomNumber(array[0], array[array.length - 1]);
};
