/**
 * Join Address OBj
 * @param {Address} address
 * @param {string} preText
 * @param {string} endText
 */
export const joinAddressObj = (address, preText, endText) => {
  const addressArr = [];

  if (preText) addressArr.push(preText);

  if (address?.street2) addressArr.push(address.street2);
  if (address?.street1) addressArr.push(address.street1);
  if (address?.zipCode) addressArr.push(address.zipCode);
  if (address?.city) addressArr.push(address.city);
  if (address?.state) addressArr.push(address.state);
  if (address?.country) addressArr.push(address.country);

  if (endText) addressArr.push(endText);

  return addressArr.join(', ');
};

/**
 * Check valid address or not
 * @param {Address} address
 * @param {boolean} check
 */
export const checkValidAddress = (address, check) => {
  if (check === false) return false; // if check is false then igonre other checks

  // if (!address?.street2) return false; // street address & number is not required
  // if (!address?.street1) return false;
  if (!address?.zipCode) return false;
  if (!address?.city) return false;
  if (!address?.state) return false;
  if (!address?.country) return false;

  return true;
};
