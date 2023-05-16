import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';

import type { Facade } from '@/modules/algorithm/domain/facade';
import type { InputDataType } from '@/modules/algorithm/domain/types';
import type { AlgorithmType } from '@/modules/algorithm/domain/constants';
import type { Solution } from '@/modules/algorithm/domain/algorithms/solution/solution';

export class ViewModel<T extends AlgorithmType> {
  private algorithm: Facade;
  private interval = 1000;
  private intervalId: number | undefined;

  input: Ref<InputDataType<T> | null>;
  solution: Ref<Solution<T> | null>;
  position: Ref<number>;
  playing: Ref<boolean>;
  logs: ComputedRef<string[]>;

  constructor(algorithm: Facade) {
    this.algorithm = algorithm;
    this.input = ref(null);
    this.solution = ref(null);
    this.position = ref(0);
    this.playing = ref(false);

    this.logs = computed(() => {
      const logs = [];

      for (let i = 1; i <= this.position.value; i++) {
        const log = this.solution.value?.steps[i]?.log;
        log && logs.push(log);
      }

      return logs;
    });
  }

  generateSolution(type: T, input: InputDataType<T>) {
    this.pause();
    this.toStep(0);
    this.input.value = input;
    this.solution.value = this.algorithm.getSolution<T>(type, input);
  }

  visualize() {
    this.toStep(0);
    this.play();
  }

  play() {
    this.playing.value = true;
    this.startAutoStepChange();
  }

  pause() {
    this.playing.value = false;
    this.stopAutoStepChange();
  }

  private startAutoStepChange() {
    this.intervalId = setInterval(() => {
      if (this.playing.value) {
        this.toNextStep();
      } else {
        this.stopAutoStepChange();
      }
    }, this.interval);
  }

  private stopAutoStepChange() {
    clearTimeout(this.intervalId);
  }

  toNextStep() {
    if (!this.solution.value) return;

    if (this.position.value < this.solution.value.steps.length - 1) {
      this.toStep(this.position.value + 1);
    } else {
      this.pause();
    }
  }

  toPrevStep() {
    this.position.value && this.toStep(this.position.value - 1);
  }

  toStep(position: number) {
    this.position.value = position;
  }
}
