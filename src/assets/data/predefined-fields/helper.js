/**
 * Generate predefined fields
 * @param {Array} arr
 * @returns {PredefinedField[]}
 */
export const generatePredefinedSwitchFields = (arr) =>
  arr.map((t) => ({
    key: t.value,
    label: t.label,
    icon: t?.icon,
    fieldType: 'switch',
    dataType: 'boolean',
  }));
