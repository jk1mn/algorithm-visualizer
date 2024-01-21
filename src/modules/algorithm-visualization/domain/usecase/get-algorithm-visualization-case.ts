import { AlgorithmFactory, Solution, type AlgorithmOptions } from '@/modules/algorithm-visualization';

export class GetAlgorithmVisualizationCase {
  execute ({ type, inputData, detailedSolution }: AlgorithmOptions): Solution {
    const algorithm = AlgorithmFactory.getAlgorithm(type, detailedSolution);

    return algorithm.solve(inputData);
  }
}
