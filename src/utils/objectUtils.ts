export const isEmpty = (value: unknown): boolean => {
  if (value === null) return true;
  if (typeof value === 'undefined') return true;
  if (typeof value === 'string' && value === '') return true;
  if (Array.isArray(value) && value.length < 1) return true;
  if (
    typeof value === 'object' &&
    value.constructor.name === 'Object' &&
    Object.keys(value).length < 1 &&
    Object.getOwnPropertyNames(value).length < 1
  )
    return true;
  if (
    typeof value === 'object' &&
    value.constructor.name === 'String' &&
    Object.keys(value).length < 1
  )
    return true;
  return false;
};
