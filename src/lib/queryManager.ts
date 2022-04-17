export const getMultipleColums = (data) => {
  let option = {};
  for (const [key, value] of Object.entries(data)) {
    option[key] = value;
  }
  return option;
};
