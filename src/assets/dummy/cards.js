/**
 * Demo card list
 * @type {Card[]}
 */
export const cards = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    cardType: 'mastercard',
    primary: true,
    userId: 2,
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    cardType: 'visa',
    primary: false,
    userId: 2,
  },
  {
    id: '3',
    cardNumber: '**** **** **** 9012',
    cardType: 'mastercard',
    primary: false,
    userId: 2,
  },
  {
    id: '4',
    cardNumber: '**** **** **** 3456',
    cardType: 'visa',
    primary: false,
    userId: 2,
  },
  {
    id: '5',
    cardNumber: '**** **** **** 7890',
    cardType: 'mastercard',
    primary: false,
    userId: 2,
  },
  {
    id: '6',
    cardNumber: '**** **** **** 2345',
    cardType: 'visa',
    primary: false,
    userId: 2,
  },
  {
    id: '7',
    cardNumber: '**** **** **** 6789',
    cardType: 'mastercard',
    primary: false,
    userId: 2,
  },
  {
    id: '8',
    cardNumber: '**** **** **** 0123',
    cardType: 'visa',
    primary: false,
    userId: 2,
  },
  {
    id: '9',
    cardNumber: '**** **** **** 4567',
    cardType: 'mastercard',
    primary: false,
    userId: 2,
  },
  {
    id: '10',
    cardNumber: '**** **** **** 8901',
    cardType: 'visa',
    primary: false,
    userId: 2,
  },
];

/**
 * Find cards by user id
 * @param {string} id
 * @returns {Card[]}
 */
export const getCardsByUserId = (id) => cards.filter((card) => card.userId === id);

/**
 * Find card by id
 * @param {string} id
 * @returns {Card | undefined}
 */
export const getCardById = (id) => cards.find((card) => card.id === id);

/**
 * Find primary card by user id
 * @param {string} id
 * @returns {Card | undefined}
 */
export const getPrimaryCardByUserId = (id) =>
  cards.find((card) => card.userId === id && card.primary);
