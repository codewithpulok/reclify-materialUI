/**
 * Get warehouse address
 * @param {WarehouseAddress} address
 */
export const getWarehouseAddress = (address) =>
  `${address.streetNumber} ${address.streetAddress}, ${address.city} ${address.state}, ${address.country}`;
