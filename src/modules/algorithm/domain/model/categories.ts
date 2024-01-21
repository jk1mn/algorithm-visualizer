import { type AlgorithmCategory, AlgorithmCategoryType } from './definitions';

export default <AlgorithmCategory[]>[
  {
    name: 'Sorting',
    type: AlgorithmCategoryType.Sorting,
    comparable: true,
  },
  {
    name: 'Search',
    type: AlgorithmCategoryType.Search,
    comparable: true,
  },
];
