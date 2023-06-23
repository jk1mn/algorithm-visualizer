import type BubbleSortPreview from '@/components/algorithms/form/BubbleSort.vue';
import type BubbleSortForm from '@/components/algorithms/preview/BubbleSort.vue';
import type BinarySearchForm from '@/components/algorithms/form/BinarySearch.vue';
import type BinarySearchPreview from '@/components/algorithms/preview/BinarySearch.vue';

import { AlgorithmType } from './constants';
import type { SearchNumberInput } from './dto/input/search-number-input';
import type { SearchNumberPayload } from './dto/step/search-number-payload';
import type { SortNumericArrayInput } from './dto/input/sort-numeric-array-input';
import type { SortNumericArrayPayload } from './dto/step/sort-numeric-array-payload';

type Algorithm<Input, Payload, Preview, Form> = {
  inputData: Input;
  stepPayload: Payload;
  previewComponent: Preview;
  formComponent: Form;
};

type AlgorithmMap = {
  [AlgorithmType.BinarySearch]: Algorithm<SearchNumberInput, SearchNumberPayload, BinarySearchPreview, BinarySearchForm>;
  [AlgorithmType.BubbleSort]: Algorithm<SortNumericArrayInput, SortNumericArrayPayload, BubbleSortPreview, BubbleSortForm>;
};

export type PayloadType<T extends AlgorithmType> = AlgorithmMap[T]['stepPayload'];
export type InputDataType<T extends AlgorithmType> = AlgorithmMap[T]['inputData'];
export type PreviewType<T extends AlgorithmType> = AlgorithmMap[T]['previewComponent'];
export type FormType<T extends AlgorithmType> = AlgorithmMap[T]['formComponent'];

export type LinesRange = Array<number|string>;
