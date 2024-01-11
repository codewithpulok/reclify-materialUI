const transactions = [
  {
    id: 'transaction-1',
    customer: {
      id: 'customer-1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'https://i.pravatar.cc/150?u=customer-1',
    },
    createdAt: Date.now() - 1 * 86400000,
    price: 150.99,
    status: 'PENDING',
    userId: 2,
  },
];

module.exports = transactions;
