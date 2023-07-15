import type BubbleSortPreview from '@/components/algorithms/form/BubbleSort.vue';
import type BubbleSortForm from '@/components/algorithms/preview/BubbleSort.vue';
import type BinarySearchForm from '@/components/algorithms/form/BinarySearch.vue';
import type BinarySearchPreview from '@/components/algorithms/preview/BinarySearch.vue';
import type BubbleSortInfo from '@/modules/algorithm/presentation/view/info/BubbleSort.vue';
import type BinarySearchInfo from '@/modules/algorithm/presentation/view/info/BinarySearch.vue';

import { AlgorithmType } from './constants';
import type { SearchNumberInput } from './dto/input/search-number-input';
import type { SearchNumberPayload } from './dto/step/search-number-payload';
import type { SortNumericArrayInput } from './dto/input/sort-numeric-array-input';
import type { SortNumericArrayPayload } from './dto/step/sort-numeric-array-payload';

type Algorithm<Input, Payload, Preview, Form, Info> = {
  inputData: Input;
  stepPayload: Payload;
  previewComponent: Preview;
  formComponent: Form;
  infoComponent: Info;
};

type AlgorithmMap = {
  [AlgorithmType.BinarySearch]: Algorithm<SearchNumberInput, SearchNumberPayload, BinarySearchPreview, BinarySearchForm, BinarySearchInfo>;
  [AlgorithmType.BubbleSort]: Algorithm<SortNumericArrayInput, SortNumericArrayPayload, BubbleSortPreview, BubbleSortForm, BubbleSortInfo>;
};

export type PayloadType<T extends AlgorithmType> = AlgorithmMap[T]['stepPayload'];
export type InputDataType<T extends AlgorithmType> = AlgorithmMap[T]['inputData'];
export type PreviewType<T extends AlgorithmType> = AlgorithmMap[T]['previewComponent'];
export type FormType<T extends AlgorithmType> = AlgorithmMap[T]['formComponent'];
export type InfoComponent<T extends AlgorithmType> = AlgorithmMap[T]['infoComponent'];;

export type LinesRange = Array<number|string>;
