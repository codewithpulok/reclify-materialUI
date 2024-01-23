import { getSellers } from './users';

/**
 * Plans dummy list
 * @type {Plan[]}
 */
export const plans = [
  {
    subscription: 'basic',
    price: 150,
    primary: false,
    features: [
      { id: '1', title: '3 Prototypes' },
      { id: '2', title: '3 Boards' },
      { id: '3', title: 'Up To 5 Team Members' },
    ],
  },
  {
    subscription: 'starter',
    price: 500,
    primary: true,
    features: [
      { id: '1', title: '3 Prototypes' },
      { id: '2', title: '3 Boards' },
      { id: '3', title: 'Up To 5 Team Members' },
      { id: '4', title: 'Advanced Security' },
      { id: '5', title: 'Issue Escalation' },
    ],
  },
  {
    subscription: 'premium',
    price: 1000,
    primary: false,
    features: [
      { id: '1', title: '3 Prototypes' },
      { id: '2', title: '3 Boards' },
      { id: '3', title: 'Up To 5 Team Members' },
      { id: '4', title: 'Advanced Security' },
      { id: '5', title: 'Issue Escalation' },
      { id: '6', title: 'Issue Development license' },
      { id: '7', title: 'Permissions & workflows' },
    ],
  },
];

/**
 * Get all plans
 * @returns {Plan[]}
 */
export const getAllPlans = () => plans;

/**
 * Get all memberships
 * @returns {{user: User, plan: Plan}[]}
 */
export const getAllMemberships = () =>
  getSellers().map((user) => ({ user, plan: plans[Math.round(Math.random() * plans.length)] }));

export const PLAN_SUBSCRIPTION_OPTIONS = [
  { value: 'basic', label: 'Basic', color: 'success' },
  { value: 'starter', label: 'Starter', color: 'warning' },
  { value: 'premium', label: 'Premium', color: 'primary' },
];

export const getPlanSubscriptionColor = (planSub) => {
  const planOption = PLAN_SUBSCRIPTION_OPTIONS.find((option) => option.value === planSub);

  if (!planOption) return 'default';

  return planOption.color;
};
