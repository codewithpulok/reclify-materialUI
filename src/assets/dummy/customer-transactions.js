import { getUserByID } from './users';
import { getWarehouseById } from './warehouses';

/** @type {CustomerTransaction[]} */
const transactions = [
  {
    id: 'transaction-1',
    warehouseId: 'abc123',
    sellerId: '2',
    customerId: '3',
    createdAt: 1671027368000,
    updatedAt: 1671050423000,
    status: 'completed',
    price: 2354,
  },
  {
    id: 'transaction-2',
    warehouseId: 'def456',
    sellerId: '4',
    customerId: '3',
    createdAt: 1671034821000,
    updatedAt: 1671042147000,
    status: 'pending',
    price: 1789,
  },
  {
    id: 'transaction-3',
    warehouseId: 'ghi789',
    sellerId: '5',
    customerId: '3',
    createdAt: 1671034824000,
    updatedAt: 1671042150000,
    status: 'declined',
    price: 3210,
  },
  {
    id: 'transaction-4',
    warehouseId: 'jkl012',
    sellerId: '6',
    customerId: '3',
    createdAt: 1671045002000,
    updatedAt: 1671056007000,
    status: 'completed',
    price: 1547,
  },
  {
    id: 'transaction-5',
    warehouseId: 'mno345',
    sellerId: '7',
    customerId: '3',
    createdAt: 1671051124000,
    updatedAt: 1671058918000,
    status: 'pending',
    price: 2895,
  },
  {
    id: 'transaction-6',
    warehouseId: 'pqr678',
    sellerId: '8',
    customerId: '3',
    createdAt: 1671055436000,
    updatedAt: 1671061839000,
    status: 'completed',
    price: 1985,
  },
  {
    id: 'transaction-7',
    warehouseId: 'stu901',
    sellerId: '9',
    customerId: '3',
    createdAt: 1671060952000,
    updatedAt: 1671069165000,
    status: 'declined',
    price: 2678,
  },
  {
    id: 'transaction-8',
    warehouseId: 'vwx234',
    sellerId: '10',
    customerId: '3',
    createdAt: 1671065833000,
    updatedAt: 1671075011000,
    status: 'completed',
    price: 1432,
  },
  {
    id: 'transaction-9',
    warehouseId: 'yzu567',
    sellerId: '2',
    customerId: '3',
    createdAt: 1671070647000,
    updatedAt: 1671079374000,
    status: 'pending',
    price: 2246,
  },
  {
    id: 'transaction-10',
    warehouseId: '123abc',
    sellerId: '4',
    customerId: '3',
    createdAt: 1671075566000,
    updatedAt: 1671083682000,
    status: 'completed',
    price: 1765,
  },
];

/**
 * generate Transaction Data
 * @param {string} id - transaction id
 * @returns {CustomerTransaction}
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
 * @returns {CustomerTransaction[]}
 */
export const getCustomerTransactions = (id) => {
  const filteredTransactions = transactions.filter((t) => t.customerId === id);

  return filteredTransactions.map((t) => generateTransaction(t.id));
};

export const TRANSACTION_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'declined', label: 'Declined' },
];
