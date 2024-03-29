export const getUniqueValues = <T>(
  data: T[],
  key: keyof T
): Array<T[keyof T]> => {
  const uniqueValues = data.reduce((unique, item) => {
    const value = item[key];
    if (!value) {
      unique.add(value);
    }
    return unique;
  }, new Set<T[keyof T]>());

  return [...uniqueValues];
};

interface SortableById {
  id: number | string;
}

export function sortByIdAsc<T extends SortableById>(array: T[]): T[] {
  return array.sort((a, b) => Number(a.id) - Number(b.id));
}

// export const getUniqueValues = (data, key) => {
//   const uniqueValues = data.reduce((unique, item) => {
//     unique.add(item[key]);
//     return unique;
//   }, new Set());

//   return [...uniqueValues];
// };
