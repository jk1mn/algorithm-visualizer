export function randomNumber (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function round (value: number) {
  return Math.round(value * 100) / 100;
}
