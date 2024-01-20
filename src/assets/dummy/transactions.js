import { getUserByID } from './users';
import { getWarehouseById } from './warehouses';

/** @type {Transaction[]} */
const transactions = [
  {
    id: 'transaction-1',
    warehouseId: 'abc123',
    sellerId: '1',
    customerId: '3',
    createdAt: 238947981279,
    updatedAt: 237902790943,
    status: 'completed',
    area: 2500,
    pricePerSquare: 1.5,
  },
  {
    id: 'transaction-2',
    warehouseId: 'def456',
    sellerId: '1',
    customerId: '3',
    createdAt: 238947982134,
    updatedAt: 237902791587,
    status: 'pending',
    area: 4000,
    pricePerSquare: 1.2,
  },
  {
    id: 'transaction-3',
    warehouseId: 'ghi789',
    sellerId: '1',
    customerId: '3',
    createdAt: 238947983001,
    updatedAt: 237902792232,
    status: 'declined',
    area: 3000,
    pricePerSquare: 1.8,
  },
];
/**
 * generate Transaction Data
 * @param {string} id - transaction id
 * @returns {Transaction}
 */
const generateTransaction = (id) => {
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) return undefined;

  transaction.warehouse = getWarehouseById(transaction.warehouseId);
  transaction.customer = getUserByID(transaction.customerId);
  transaction.seller = getUserByID(transaction.sellerId);

  return transaction;
};

/**
 * get customer transactions
 * @param {string} id - customer id
 * @returns {Transaction[]}
 */
export const getCustomerTransactions = (id) => {
  const filteredTransactions = transactions.filter((t) => t.customerId === id);

  return filteredTransactions.map((t) => generateTransaction(t.id));
};

/**
 * get seller transactions
 * @param {string} id - seller id
 * @returns {Transaction[]}
 */
export const getSellerTransactions = (id) => {
  const filteredTransactions = transactions.filter((t) => t.sellerId === id);

  return filteredTransactions.map((t) => generateTransaction(t.id));
};

/**
 * get all transactions
 * @returns {Transaction[]}
 */
export const getAllTransactions = () => transactions.map((t) => generateTransaction(t.id));

export const TRANSACTION_STATUS_OPTIONS = [
  { value: 'completed', label: 'Completed', color: 'success' },
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'declined', label: 'Declined', color: 'error' },
];
export const getTransactionStatusColor = (transactionStatus) => {
  const transactionOpiton = TRANSACTION_STATUS_OPTIONS.find(
    (option) => option.value === transactionStatus
  );

  if (!transactionOpiton) return 'default';

  return transactionOpiton.color;
};
