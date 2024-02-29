export const PLAN_OPTIONS = [
  { value: 'free', label: 'Free', color: 'success' },
  { value: 'professional', label: 'Professional', color: 'warning' },
  { value: 'enterprise', label: 'Enterprise', color: 'primary' },
];

export const getPlanColor = (planSub) => {
  const planOption = PLAN_OPTIONS.find((option) => option.value === planSub);

  if (!planOption) return 'default';

  return planOption.color;
};
