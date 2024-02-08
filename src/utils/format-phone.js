/**
 * Format phone number
 * @param {string} number
 * @returns {string}
 */
const formatPhone = (number) => {
  const result = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  return result;
};

export default formatPhone;
