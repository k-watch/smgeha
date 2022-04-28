export const getMultipleColums = (data, not) => {
  let option = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === not) {
      continue;
    }
    option[key] = value;
  }
  return option;
};
