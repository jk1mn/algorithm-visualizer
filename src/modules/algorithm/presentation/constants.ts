import type { AlgorithmType } from "../domain/constants";
import type { InputDataType } from "../domain/types";

export type DataProviderComponent<T extends AlgorithmType> = {
  generateRandomInput: () => InputDataType<T>;
};

export enum MenuOption {
  RANDOMIZE = 'randomize',
}

export const menuOptions = [
  { label: 'Randomize', value: MenuOption.RANDOMIZE },
];
