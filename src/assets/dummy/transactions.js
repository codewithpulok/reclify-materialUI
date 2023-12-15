/**
 * Dummy transaction list
 * @type {Transaction[]}
 */
const transactions = [
  {
    id: 'transaction-1',
    customer: {
      id: 'customer-1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-1',
    },
    createdAt: Date.now() - 1 * 86400000,
    price: 150.99,
    status: 'PENDING',
    userId: 2,
  },
  {
    id: 'transaction-2',
    customer: {
      id: 'customer-2',
      name: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-2',
    },
    createdAt: Date.now() - 2 * 86400000,
    price: 99.95,
    status: 'COMPLETED',
    userId: 2,
  },
  {
    id: 'transaction-3',
    customer: {
      id: 'customer-3',
      name: 'Michael Davis',
      email: 'michael.davis@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-3',
    },
    createdAt: Date.now() - 3 * 86400000,
    price: 249.75,
    status: 'PENDING',
    userId: 2,
  },
  {
    id: 'transaction-4',
    customer: {
      id: 'customer-4',
      name: 'Emily White',
      email: 'emily.white@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-4',
    },
    createdAt: Date.now() - 4 * 86400000,
    price: 199.5,
    status: 'COMPLETED',
    userId: 2,
  },
  {
    id: 'transaction-5',
    customer: {
      id: 'customer-5',
      name: 'David Robinson',
      email: 'david.robinson@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-5',
    },
    createdAt: Date.now() - 5 * 86400000,
    price: 349.25,
    status: 'PENDING',
    userId: 2,
  },
  {
    id: 'transaction-6',
    customer: {
      id: 'customer-6',
      name: 'Sophia Miller',
      email: 'sophia.miller@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-6',
    },
    createdAt: Date.now() - 6 * 86400000,
    price: 79.99,
    status: 'COMPLETED',
    userId: 2,
  },
  {
    id: 'transaction-7',
    customer: {
      id: 'customer-7',
      name: 'Matthew Taylor',
      email: 'matthew.taylor@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-7',
    },
    createdAt: Date.now() - 7 * 86400000,
    price: 129.75,
    status: 'PENDING',
    userId: 2,
  },
  {
    id: 'transaction-8',
    customer: {
      id: 'customer-8',
      name: 'Olivia Brown',
      email: 'olivia.brown@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-8',
    },
    createdAt: Date.now() - 8 * 86400000,
    price: 299.5,
    status: 'COMPLETED',
    userId: 2,
  },
  {
    id: 'transaction-9',
    customer: {
      id: 'customer-9',
      name: 'Daniel Harris',
      email: 'daniel.harris@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-9',
    },
    createdAt: Date.now() - 9 * 86400000,
    price: 179.25,
    status: 'PENDING',
    userId: 2,
  },
  {
    id: 'transaction-10',
    customer: {
      id: 'customer-10',
      name: 'Ava Jones',
      email: 'ava.jones@example.com',
      photoURL: 'https://i.pravatar.cc/150?u=customer-10',
    },
    createdAt: Date.now() - 10 * 86400000,
    price: 219.99,
    status: 'COMPLETED',
    userId: 2,
  },
];

/**
 * Find transections by user id
 * @param {string} id
 * @returns {Transaction[]}
 */
export const getTransectionsByUserId = (id) =>
  transactions.filter((transaction) => transaction.userId === id);

/**
 * Find transaction by id
 * @param {string} id
 * @returns {Transaction | undefined}
 */
export const getTransectionById = (id) => transactions.find((transaction) => transaction.id === id);

export const TRANSACTION_STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELED', label: 'Canceled' },
  { value: 'REFUNDED', label: 'Refunded' },
];
