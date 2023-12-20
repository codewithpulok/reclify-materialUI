/**
 * Get warehouse address
 * @param {WarehouseAddress} address
 */
export const getWarehouseAddress = (address) => {
  if (
    !address?.streetNumber &&
    !address?.streetAddress &&
    !address?.city &&
    !address?.state &&
    !address?.country
  )
    return '';

  return `${address?.streetNumber || ''} ${address?.streetAddress || ''}, ${address?.city || ''}, ${
    address?.state || ''
  }, ${address?.country || ''}`;
};
