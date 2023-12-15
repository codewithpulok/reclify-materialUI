/**
 * Plans dummy list
 * @type {Plan[]}
 */
export const plans = [
  {
    subscription: 'basic',
    price: 0,
    primary: false,
  },
  {
    subscription: 'starter',
    price: 4.99,
    primary: true,
  },
  {
    subscription: 'premium',
    price: 9.99,
    primary: false,
  },
];

/**
 * Get all plans
 * @returns {Plan[]}
 */
export const getAllPlans = () => plans;
