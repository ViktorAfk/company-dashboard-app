export const getSkippedItems = (page: number, limit: number) => {
  return page > 0 ? limit * (page - 1) : 0;
};
