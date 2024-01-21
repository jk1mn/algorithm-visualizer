export const addSuffix = (number: number): string => {
  let suffix;

  switch (number) {
    case 1:
      suffix = 'st';
      break;
    case 2:
      suffix = 'nd';
      break;
    case 3:
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
      break;
  }

  return number + suffix;
};
