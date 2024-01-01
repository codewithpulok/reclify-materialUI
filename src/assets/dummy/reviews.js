import { getUserByID } from './users';

/** @type {Review[]} */
export const reviews = [
  {
    id: 'review002',
    warehouseId: 'def456',
    authorId: '3',
    createdAt: 1672696799000,
    updatedAt: 1672783199000,
    rating: 5,
    feedback:
      'Metro Warehousing exceeded my expectations. The industrial zone setting gives it an authentic feel. Spacious and secure storage spaces.',
  },

  {
    id: 'ghi789-review001',
    warehouseId: 'def456',
    authorId: '5',
    createdAt: 1672531199000,
    updatedAt: 1672617599000,
    rating: 4.2,
    feedback:
      "I've been using Skyline Depot for my storage needs, and it has been a positive experience. The suburban location offers a peaceful atmosphere, and the facilities are well-maintained. The staff is friendly and always willing to assist.",
  },
  {
    id: 'ghi789-review002',
    warehouseId: 'def456',
    authorId: '3',
    createdAt: 1672696799000,
    updatedAt: 1672783199000,
    rating: 5,
    feedback:
      'I highly recommend Skyline Depot for anyone looking for secure and reliable storage solutions. The suburban setting is a refreshing change, and the pricing is reasonable. The staff is professional and ensures a smooth experience.',
  },
];

/**
 * generate Review Data
 * @param {string} id - review id
 * @returns {Review}
 */
const generateReview = (id) => {
  const review = reviews.find((r) => r.id === id);

  if (!review) return undefined;

  review.author = getUserByID(review.authorId);

  return review;
};

/**
 * get warehouse reviews
 * @param {string} id - warehouse id
 * @returns {Review[]}
 */
export const getWarehouseReviews = (id) => {
  const filteredReviews = reviews.filter((r) => r.warehouseId === id);

  return filteredReviews.map((r) => generateReview(r.id));
};
