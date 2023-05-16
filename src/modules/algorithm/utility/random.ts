import { randomNumbers } from '@/utils/arrays';
import {
  MAX_ARRAY_LENGTH,
  MIN_ARRAY_LENGTH,
  MAX_ELEMENT_VALUE,
} from '../domain/constants';

export const getRandomList = () =>
  randomNumbers(MIN_ARRAY_LENGTH, MAX_ARRAY_LENGTH, MAX_ELEMENT_VALUE);
