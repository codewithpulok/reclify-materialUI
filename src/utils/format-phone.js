/**
 * Format phone number 000-000-0000
 * @param {string} number
 * @returns {string}
 */
const formatPhone = (number) => {
  const result = number.split('');

  if (result.length > 3 && result?.[3] !== '-') result.splice(3, 0, '-');
  if (result.length > 7 && result?.[7] !== '-') result.splice(7, 0, '-');

  return result.slice(0, 12).join('');
};

export default formatPhone;
