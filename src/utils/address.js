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
