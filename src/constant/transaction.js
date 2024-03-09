// transaction table options
export const transactionStatusOptions = [
  { value: 'completed', label: 'Completed', color: 'success' },
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'approved', label: 'Approved', color: 'info' },
  { value: 'admin_pending', label: 'Admin Pending', color: 'secondary' },
  { value: 'cancelled', label: 'Cancelled', color: 'error' },
];

// transaction table status color
export const getTransactionStatusColor = (value) => {
  const transactionOpiton = transactionStatusOptions.find((option) => option.value === value);

  if (!transactionOpiton) return 'default';

  return transactionOpiton.color;
};

// get transaction status label
export const getTransactionStatusLabel = (value) => {
  const transactionOpiton = transactionStatusOptions.find((option) => option.value === value);

  if (!transactionOpiton) return 'unknown';

  return transactionOpiton.label;
};
