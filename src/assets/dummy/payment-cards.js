/** @type {PaymentCard[]} */
export const paymentCards = [
  {
    id: '123456789',
    userId: '2',
    primary: true,
    holder: 'John Doe',
    number: '4111111111111111',
    expire: 1789766400000,
    securityNumber: '123',
  },
  {
    id: '987654321',
    userId: '2',
    primary: false,
    holder: 'Jane Smith',
    number: '5555555555554444',
    expire: 1685827200000,
    securityNumber: '456',
  },
  {
    id: '567890123',
    userId: '2',
    primary: false,
    holder: 'Bob Johnson',
    number: '378282246310005',
    expire: 1698777600000,
    securityNumber: '789',
  },
  {
    id: '9876543210',
    userId: '3',
    primary: true,
    holder: 'Alice Johnson',
    number: '6011111111111117',
    expire: 1776470400000,
    securityNumber: '234',
  },
  {
    id: '1234567890',
    userId: '3',
    primary: false,
    holder: 'Bob Williams',
    number: '3530111333300000',
    expire: 1804828800000,
    securityNumber: '567',
  },
  {
    id: '4567890123',
    userId: '3',
    primary: false,
    holder: 'Eva Davis',
    number: '5555555555555555',
    expire: 1833187200000,
    securityNumber: '890',
  },
];

/**
 * Find cards by user id
 * @param {string} id
 * @returns {PaymentCard[]}
 */
export const getPaymentCardsByUserId = (id) => paymentCards.filter((card) => card.userId === id);
