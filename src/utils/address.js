/**
 * Join Address OBj
 * @param {Address} address
 */
export const joinAddressObj = (address) => {
  const addressArr = [];

  if (address?.street2) addressArr.push(address.street2);
  if (address?.street1) addressArr.push(address.street1);
  if (address?.zipCode) addressArr.push(address.zipCode);
  if (address?.city) addressArr.push(address.city);
  if (address?.state) addressArr.push(address.state);
  if (address?.country) addressArr.push(address.country);

  return addressArr.join(', ');
};

/**
 * Check valid address or not
 * @param {Address} address
 */
export const checkValidAddress = (address) => {
  if (!address?.street2) return false;
  if (!address?.street1) return false;
  if (!address?.zipCode) return false;
  if (!address?.city) return false;
  if (!address?.state) return false;
  if (!address?.country) return false;

  return true;
};
