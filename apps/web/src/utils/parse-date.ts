export const parseDate = (date: string) => {
  const preparedData = date.split('T')[0];

  return preparedData;
};
