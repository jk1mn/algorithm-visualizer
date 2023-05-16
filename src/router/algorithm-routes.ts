import { AlgorithmType } from '@/modules/algorithm/domain/constants';

export class AlgorithmRoute {
  readonly id: string;
  readonly url: string;
  readonly name: string;
  readonly component: string;
  readonly type: AlgorithmType;

  constructor(
    type: AlgorithmType,
    id: string,
    name: string,
    component: string
  ) {
    this.type = type;
    this.id = id;
    this.name = name;
    this.url = '/algorithms/' + id;
    this.component = component;
  }

  static current(routeName: string): AlgorithmRoute {
    return routes.find((alg) => alg.id === routeName)!;
  }

  async getPreview() {
    return import(`@/components/algorithms/preview/${this.component}.vue`);
  }

  async getForm() {
    return import(`@/components/algorithms/form/${this.component}.vue`);
  }
}

const routes = [
  new AlgorithmRoute(
    AlgorithmType.BubbleSort,
    'bubble_sort',
    'Bubble Sort',
    'BubbleSort'
  ),
  new AlgorithmRoute(
    AlgorithmType.BinarySearch,
    'binary_search',
    'Binary Search',
    'BinarySearch'
  ),
];

export default routes;
