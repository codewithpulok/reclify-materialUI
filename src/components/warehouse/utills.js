/**
 * @param {Warehouse} warehouse
 * @returns {number}
 */
const getFixedDiscount = (warehouse) => {
  const fixedDiscounts = [
    warehouse.discount1,
    warehouse.discount3,
    warehouse.discount6,
    warehouse.discount12,
  ];
  const fixedPrice = [warehouse.price1, warehouse.price3, warehouse.price6, warehouse.price12];
  const percentageDiscounts = fixedDiscounts.map((d, index) => {
    const currentPrice = fixedPrice[index];
    if (typeof d !== 'number' || Number.isNaN(d) || d <= 0) return 0;
    if (typeof currentPrice !== 'number' || Number.isNaN(currentPrice) || currentPrice <= 0)
      return 0;

    return (d / 100) * currentPrice;
  });

  return Math.max(...percentageDiscounts);
};

/**
 * @param {Warehouse} warehouse
 * @returns {number}
 */
const getPercentageDiscount = (warehouse) => {
  const fixedDiscounts = [
    warehouse.discount1,
    warehouse.discount3,
    warehouse.discount6,
    warehouse.discount12,
  ];

  const percentageDiscounts = fixedDiscounts.map((d) => {
    if (typeof d !== 'number' || Number.isNaN(d) || d <= 0) return 0;

    return d;
  });

  return Math.max(...percentageDiscounts);
};

/**
 * @param {Warehouse} warehouse
 * @returns {number}
 */
export const getWarehouseDiscount = (warehouse) => {
  if (warehouse?.discountOption === 'fixed') {
    return getFixedDiscount(warehouse);
  }

  if (warehouse?.discountOption === 'percentage') {
    return getPercentageDiscount(warehouse);
  }

  return 0;
};
