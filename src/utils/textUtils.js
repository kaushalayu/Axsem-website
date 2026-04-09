export const normalizeText = (value) => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'text' in value) return value.text;
  if (value && typeof value === 'object') {
    const textField = Object.values(value).find(v => typeof v === 'string');
    return textField || '';
  }
  return '';
};

export const normalizeArray = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr;
};

export const normalizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const result = {};
  for (const key in obj) {
    result[key] = normalizeText(obj[key]);
  }
  return result;
};
