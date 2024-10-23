export const parseDate = (date: string) => {
  const preparedData = date.slice(0, 16).split('T').join(', ');

  return preparedData;
};
