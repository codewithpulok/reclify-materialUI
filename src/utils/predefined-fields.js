import * as Yup from 'yup';
import { fNumber } from './format-number';
import { fDay, fTime } from './format-time';

/**
 * @typedef {string | number | boolean | null} PredefinedFieldValue
 */

/**
 * @typedef {PredefinedField & {value: PredefinedFieldValue}} PredefinedFieldsWithValue
 */

/**
 * get predefined field value
 * @param {PredefinedField} field
 * @param {string | number | object | boolean | undefined} value
 * @returns {PredefinedFieldValue}
 */
export const getPredefinedFieldValue = (field, value) => {
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
    case 'days-picker': {
      return value
        ?.reduce((prev, curr, index) => {
          if (!curr) return prev;
          prev.push(fDay(index));
          return prev;
        }, [])
        ?.join(', ');
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
export const getPredefinedFieldsValue = (valueObj, predefinedFields) => {
  /** @type {PredefinedFieldsWithValue[]} */
  const array = [];

  predefinedFields.forEach((field) => {
    const value = getPredefinedFieldValue(field, valueObj?.[field.key]);

    // update the array
    array.push({ ...field, value });
  });

  return array;
};

/**
 * @param {PredefinedField} field
 */
const fieldTypeValidation = (field) => {
  let validation;

  // handle field type
  switch (field.fieldType) {
    case 'days-picker':
      validation = Yup.boolean().default(false).required();
      break;
    case 'time-picker':
      validation = {
        start: Yup.number().label('Start time').required(),
        end: Yup.number().label('Start time').required(),
      };
      break;
    default:
      validation = undefined;
      break;
  }

  return validation;
};

/**
 * @param {PredefinedField} field
 */
const dataTypeValidation = (field) => {
  let validation;

  // handle data type
  switch (field.dataType) {
    case 'boolean':
      validation = Yup.boolean();
      break;
    case 'string':
      validation = Yup.string();
      break;
    case 'number':
      validation = Yup.number();
      break;
    case 'object':
      validation = Yup.object().shape(fieldTypeValidation(field));
      break;
    case 'array':
      validation = Yup.array(fieldTypeValidation(field));
      break;
    default:
      validation = undefined;
      break;
  }

  // if validation not applied then stop further execution
  if (validation === undefined) return undefined;

  // apply label
  validation = validation.label(field.label);

  // check is requried or not
  if (field.required) validation = validation.required();

  return validation;
};

/**
 * get predefined fields schema
 * @param {PredefinedField[]} fields
 * @return {Object.<string, Yup.Schema>}
 */
export const getPredefinedFieldSchema = (fields) =>
  fields.reduce((prev, field) => {
    const validation = dataTypeValidation(field);

    // check validation exist or not
    if (validation === undefined) return prev;

    // assign the validation
    prev[field.key] = validation;

    return prev;
  }, {});

/**
 * get predefined fields default value
 * @param {PredefinedField[]} fields
 * @returns {object}
 */
export const getPredefinedFieldsDefaultValue = (fields) =>
  fields.reduce((prev, next) => {
    let value;

    // choose a value
    switch (next.dataType) {
      case 'string':
        value = '';
        break;
      case 'number':
        value = undefined;
        break;
      case 'boolean':
        value = false;
        break;
      case 'array':
        switch (next.fieldType) {
          case 'days-picker':
            value = [false, false, false, false, false, false];
            break;
          default:
            break;
        }
        break;
      case 'object':
        switch (next.fieldType) {
          case 'time-picker':
            value = {
              start: undefined,
              end: undefined,
            };
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    // assign to key
    prev[next.key] = value;

    return prev;
  }, {});
