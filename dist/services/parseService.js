export const getString = value => {
  return (value || '').toString();
};
export const getBooleanIfValid = (value, defaultValue = null) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      return value.toLowerCase() === 'true';
    }
  }
  return typeof value === 'boolean' ? value : defaultValue;
};
const isNumber = value => {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};
export const getNumberIfValid = value => {
  return isNumber(value) ? parseFloat(value) : null;
};