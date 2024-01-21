import { type Algorithm, AlgorithmCategoryType, AlgorithmComplexity, AlgorithmType } from './definitions';

export default <Algorithm[]>[
  {
    name: 'Bubble Sort',
    img: null,
    slug: 'bubble-sort',
    type: AlgorithmType.BubbleSort,
    timeComplexity: AlgorithmComplexity.ON2,
    spaceComplexity: AlgorithmComplexity.O1,
    categoryTypes: [AlgorithmCategoryType.Sorting],
  },
  {
    name: 'Binary Search',
    img: null,
    slug: 'binary-search',
    type: AlgorithmType.BinarySearch,
    timeComplexity: AlgorithmComplexity.OlogN,
    spaceComplexity: AlgorithmComplexity.O1,
    categoryTypes: [AlgorithmCategoryType.Search],
  },
];
