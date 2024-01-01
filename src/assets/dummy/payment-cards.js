/** @type {PaymentCard[]} */
export const paymentCards = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    cardType: 'mastercard',
    primary: false,
    userId: '2',
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    cardType: 'visa',
    primary: true,
    userId: '2',
  },
  {
    id: '3',
    cardNumber: '**** **** **** 9012',
    cardType: 'mastercard',
    primary: false,
    userId: '2',
  },
  {
    id: '4',
    cardNumber: '**** **** **** 3456',
    cardType: 'visa',
    primary: true,
    userId: '3',
  },
  {
    id: '5',
    cardNumber: '**** **** **** 7890',
    cardType: 'mastercard',
    primary: false,
    userId: '3',
  },
];

/**
 * Find cards by user id
 * @param {string} id
 * @returns {PaymentCard[]}
 */
export const getPaymentCardsByUserId = (id) => paymentCards.filter((card) => card.userId === id);
