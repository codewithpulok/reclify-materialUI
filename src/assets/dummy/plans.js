/**
 * Plans dummy list
 * @type {Plan[]}
 */
export const plans = [
  {
    subscription: 'basic',
    price: 150,
    primary: false,
  },
  {
    subscription: 'starter',
    price: 500,
    primary: true,
  },
  {
    subscription: 'premium',
    price: 1000,
    primary: false,
  },
];

/**
 * Get all plans
 * @returns {Plan[]}
 */
export const getAllPlans = () => plans;
