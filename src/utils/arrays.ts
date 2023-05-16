export const randomSortedList = (minLength: number, maxLength: number) => {
  const length = Math.floor(
    Math.random() * (maxLength - minLength + 1) + minLength
  );
  const list = [Math.ceil(Math.random() * 10)];
  for (let i = 1; i < length; i++) {
    list.push(list[i - 1] + Math.ceil(Math.random() * 10));
  }
  return list;
};

export const middle = (start: number, end: number) =>
  start + Math.floor((end - start) / 2);

export const range = (start: number, end: number) => {
  const len = end - start + 1;
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = start + i;
  }
  return arr;
};

export const randomNumbers = (
  minLength: number,
  maxLength: number,
  maxValue: number
): number[] =>
  new Array(Math.floor(Math.random() * (maxLength - minLength + 1) + minLength))
    .fill(undefined)
    .map(() => Math.ceil(Math.random() * maxValue));

export const swap = (array: number[], index1: number, index2: number) => {
  const tmp = array[index1];
  array[index1] = array[index2];
  array[index2] = tmp;
};
