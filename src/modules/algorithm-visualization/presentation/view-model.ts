import { ref, computed } from 'vue';

import type { AlgorithmType } from '@/modules/algorithm';
import type {
  AlgorithmOptions,
  GetAlgorithmInputDataCase,
  GetAlgorithmVisualizationCase,
  InputData,
  Solution,
} from '@/modules/algorithm-visualization';
import { InputDataSource } from '@/modules/algorithm-visualization';

export class ViewModel {
  private interval = 1000;
  private intervalId: number | undefined;

  input = ref<InputData | null>(null);
  solution = ref<Solution | null>(null);
  position = ref<number>(0);
  playing = ref<boolean>(false);
  scale = ref<number>(1);

  logs = computed(() => {
    const logs = new Array(this.position.value).fill('');

    for (let i = 1; i <= this.position.value; i++) {
      logs[this.position.value - i] = this.solution.value?.steps[i]?.log;
    }

    return logs;
  });

  constructor (
    private getVisualizationCase: GetAlgorithmVisualizationCase,
    private getInputDataCase: GetAlgorithmInputDataCase,
  ) {
  }

  generateRandomInput (type: AlgorithmType) {
    const input = this.getInputDataCase.execute(type, InputDataSource.Random);
    this.generateSolution(type, input);
  }

  generateSolution (type: AlgorithmType, inputData: InputData) {
    this.pause();
    this.toStep(0);
    this.input.value = inputData;
    this.solution.value = this.getVisualizationCase.execute(<AlgorithmOptions>{
      type,
      inputData,
      detailedSolution: true,
    });
  }

  visualize () {
    this.toStep(0);
    this.play();
  }

  play () {
    this.playing.value = true;
    this.startAutoStepChange();
  }

  pause () {
    this.playing.value = false;
    this.stopAutoStepChange();
  }

  private startAutoStepChange () {
    this.intervalId = setInterval(() => {
      if (this.playing.value) {
        this.toNextStep();
      } else {
        this.stopAutoStepChange();
      }
    }, this.interval);
  }

  private stopAutoStepChange () {
    clearTimeout(this.intervalId);
  }

  toNextStep () {
    if (!this.solution.value) return;

    if (this.position.value < this.solution.value.steps.length - 1) {
      this.toStep(this.position.value + 1);
    } else {
      this.pause();
    }
  }

  toPrevStep () {
    this.position.value && this.toStep(this.position.value - 1);
  }

  toStep (position: number) {
    this.position.value = position;
  }

  setScale (scale: number) {
    this.scale.value = scale;
  }
}
