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
    warehouseId: 'ghi789',
    authorId: 'customer-1',
    createdAt: 1672531199000,
    updatedAt: 1672617599000,
    rating: 4.2,
    feedback:
      "I've been using Skyline Depot for my storage needs, and it has been a positive experience. The suburban location offers a peaceful atmosphere, and the facilities are well-maintained. The staff is friendly and always willing to assist.",
  },
  {
    id: 'ghi789-review002',
    warehouseId: 'ghi789',
    authorId: '3',
    createdAt: 1672696799000,
    updatedAt: 1672783199000,
    rating: 5,
    feedback:
      'I highly recommend Skyline Depot for anyone looking for secure and reliable storage solutions. The suburban setting is a refreshing change, and the pricing is reasonable. The staff is professional and ensures a smooth experience.',
  },
  {
    id: 'ghi789-review003',
    warehouseId: 'ghi789',
    authorId: 'customer-2',
    createdAt: 1672842399000,
    updatedAt: 1672928799000,
    rating: 3.8,
    feedback:
      'My experience with Skyline Depot has been decent. The suburban location provides a quieter environment, but it might not be ideal for those needing frequent access. The facilities are clean, and the pricing is competitive.',
  },
  {
    id: 'ghi789-review004',
    warehouseId: 'ghi789',
    authorId: '3',
    createdAt: 1673007999000,
    updatedAt: 1673094399000,
    rating: 5,
    feedback:
      'Skyline Depot is a hidden gem! The suburban location is peaceful, and the facilities are top-notch. I appreciate the security measures in place, and the staff is always ready to assist. Definitely worth considering for your storage needs.',
  },
  {
    id: 'ghi789-review005',
    warehouseId: 'ghi789',
    authorId: 'customer-3',
    createdAt: 1673163599000,
    updatedAt: 1673249999000,
    rating: 2.5,
    feedback:
      'While Skyline Depot has its merits, I found the suburban location to be a drawback for my needs. The storage spaces are well-maintained, but the access could be more convenient. Consider your accessibility requirements before choosing this facility.',
  },
  {
    id: 'ghi789-review006',
    warehouseId: 'ghi789',
    authorId: '3',
    createdAt: 1673319199000,
    updatedAt: 1673405599000,
    rating: 4.7,
    feedback:
      'Skyline Depot offers a serene storage environment. The suburban landscape is a welcome change, providing a peaceful atmosphere. The facilities are clean, and the staff is courteous. A good choice for those seeking a quiet storage experience.',
  },
  {
    id: 'ghi789-review007',
    warehouseId: 'ghi789',
    authorId: 'customer-4',
    createdAt: 1673474799000,
    updatedAt: 1673561199000,
    rating: 3.2,
    feedback:
      'My experience with Skyline Depot has been average. The suburban setting offers tranquility, but the overall accessibility may be a concern for some users. The staff is helpful, and the pricing is fair.',
  },
  {
    id: 'ghi789-review008',
    warehouseId: 'ghi789',
    authorId: '3',
    createdAt: 1673630399000,
    updatedAt: 1673716799000,
    rating: 5,
    feedback:
      "I've been using Skyline Depot for a few months, and I'm impressed. The suburban location provides a calm atmosphere, and the storage units are well-maintained. The staff is responsive, making it a hassle-free experience.",
  },
  {
    id: 'ghi789-review009',
    warehouseId: 'ghi789',
    authorId: 'customer-5',
    createdAt: 1673785999000,
    updatedAt: 1673872399000,
    rating: 4.1,
    feedback:
      'Skyline Depot offers a decent storage solution. The suburban surroundings contribute to a peaceful experience, and the facilities are clean. The pricing is reasonable, making it a viable option for storage needs.',
  },
  {
    id: 'ghi789-review010',
    warehouseId: 'ghi789',
    authorId: '3',
    createdAt: 1673941599000,
    updatedAt: 1674027999000,
    rating: 3.6,
    feedback:
      'While Skyline Depot has its merits, the suburban location may not suit everyone. The storage facilities are well-kept, but accessibility could be a concern for those needing frequent access. Consider your specific requirements before choosing this facility.',
  },

  {
    id: 'review004',
    warehouseId: 'jkl012',
    authorId: 'customer-1',
    createdAt: 1673007999000,
    updatedAt: 1673094399000,
    rating: 5,
    feedback:
      'Urban Storage offers great facilities with a downtown vibe. The staff is friendly, and the pricing is reasonable.',
  },
  {
    id: 'review005',
    warehouseId: 'mno345',
    authorId: '3',
    createdAt: 1673163599000,
    updatedAt: 1673249999000,
    rating: 2,
    feedback:
      'Harbor Warehouses has a good location, but the spaces seem a bit cramped. Adequate for short-term storage needs.',
  },
  {
    id: 'review006',
    warehouseId: 'pqr678',
    authorId: 'customer-2',
    createdAt: 1673319199000,
    updatedAt: 1673405599000,
    rating: 4,
    feedback:
      'Green Valley Storage provides a peaceful environment surrounded by nature. The storage units are well-maintained.',
  },
  {
    id: 'review007',
    warehouseId: 'stu901',
    authorId: '3',
    createdAt: 1673474799000,
    updatedAt: 1673561199000,
    rating: 3,
    feedback:
      'Tech Hub Warehouses are modern and efficient. However, the pricing is on the higher side compared to similar facilities.',
  },
  {
    id: 'review008',
    warehouseId: 'vwx234',
    authorId: 'customer-3',
    createdAt: 1673630399000,
    updatedAt: 1673716799000,
    rating: 5,
    feedback:
      'Golden Storage is worth the extra cost. The financial district location and luxurious facilities make it stand out.',
  },
  {
    id: 'review009',
    warehouseId: 'yzu567',
    authorId: 'customer-4',
    createdAt: 1673785999000,
    updatedAt: 1673872399000,
    rating: 4,
    feedback:
      'Mountain View Warehousing provides breathtaking views. Clean and secure facilities make it a great choice.',
  },
  {
    id: 'review010',
    warehouseId: '123abc',
    authorId: 'customer-5',
    createdAt: 1673941599000,
    updatedAt: 1674027999000,
    rating: 3,
    feedback:
      'Sunset Storage has a lovely beachside location, but the pricing seems a bit high for the available space.',
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
