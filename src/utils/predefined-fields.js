import { fNumber } from './format-number';
import { fTime } from './format-time';

/**
 * @typedef {string | number | boolean | null} PredefinedFieldValue
 */

/**
 * @typedef {PredefinedField & {value: PredefinedFieldValue}} PredefinedFieldsWithValue
 */

/**
 * customize predefined field value
 * @param {PredefinedField} field
 * @param {string | number | object | boolean | undefined} value
 * @returns {PredefinedFieldValue}
 */
export const customizePredefinedFieldValue = (field, value) => {
  // avoid render if field is not defined
  if (value === undefined) return null;

  // perform customization based on type
  switch (field.type) {
    // avoid custom fields
    case 'custom':
      return null;
    // if this is number type then format
    case 'number':
      return fNumber(value);
    // if type is time picker then decode them
    case 'time-picker': {
      const startTime = fTime(value.start);
      const endTime = fTime(value.end);

      return `${startTime} - ${endTime}`;
    }
    default:
      return value;
  }
};

/**
 * get predefined fields value
 * @param {{[key: string]: number | string | object}} valueObj
 * @param {PredefinedField[]} predefinedFields
 * @return {PredefinedFieldsWithValue[]}
 */
export const predefinedFieldsValue = (valueObj, predefinedFields) => {
  /** @type {PredefinedFieldsWithValue[]} */
  const array = [];

  predefinedFields.forEach((field) => {
    const value = customizePredefinedFieldValue(field, valueObj?.[field.key]);

    // update the array
    array.push({ ...field, value });
  });

  return array;
};
