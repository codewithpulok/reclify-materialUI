/**
 * Join Address OBj
 * @param {Address} address
 */
export const joinAddressObj = (address) => {
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
