export enum AlgorithmType {
  BinarySearch = 'BinarySearch',
  BubbleSort = 'BubbleSort',
}

export interface Algorithm {
  type: AlgorithmType;
  name: string;
  slug: string;
  img: string | null;
  timeComplexity: AlgorithmComplexity;
  spaceComplexity: AlgorithmComplexity;
  categoryTypes: AlgorithmCategoryType[];
}

export interface AlgorithmCategory {
  type: AlgorithmCategoryType;
  name: string;
  comparable: boolean;
}

export enum AlgorithmCategoryType {
  Sorting = 'Sorting',
  Search = 'Search',
}

export enum AlgorithmComplexity {
  O1 = 'O1',
  OlogN = 'OlogN',
  ON = 'ON',
  ONlogN = 'ONlogN',
  ON2 = 'ON2',
  ON3 = 'ON3',
}
