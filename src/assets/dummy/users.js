import { serviceTypes } from 'src/constant/service-types';

/**
 * User collection
 * @type {User[]}
 */
export const users = [
  {
    id: '1',
    displayName: 'Sophia Miller',
    firstName: 'Sophia',
    lastName: 'Miller',
    email: 'seller@test.com',
    password: 'test123',
    avatar: 'https://i.pravatar.cc/150?u=SophiaMiller',
    phoneNumber: '+1 555666777',
    address: {
      street2: '456',
      street1: 'Oak Avenue',
      city: 'London',
      state: 'Alabama',
      zipCode: 9203842,
      country: 'United States',
    },
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    userType: 'seller',
    createdAt: 1671034821000,
    updatedAt: 1671042147000,
    socials: {
      facebook: 'https://www.facebook.com/caitlyn.kerluke',
      linkedin: 'https://www.facebook.com/caitlyn.kerluke',
      x: 'https://www.twitter.com/caitlyn.kerluke',
    },
  },
  {
    id: '2',
    displayName: 'Ethan Johnson',
    firstName: 'Ethan',
    lastName: 'Johnson',
    email: 'admin@test.com',
    password: 'test123',
    avatar: 'https://i.pravatar.cc/150?u=EthanJohnson',
    phoneNumber: '+44 7700112233',
    address: {
      street2: '456',
      street1: 'Oak Avenue',
      city: 'London',
      state: 'Alabama',
      zipCode: 9203842,
      country: 'United States',
    },
    about: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    userType: 'admin',
    createdAt: 1671027368000,
    updatedAt: 1671050423000,
    socials: {
      facebook: 'https://www.facebook.com/caitlyn.kerluke',
      instagram: 'https://www.instagram.com/caitlyn.kerluke',
      linkedin: 'https://www.linkedin.com/in/caitlyn.kerluke',
      x: 'https://www.twitter.com/caitlyn.kerluke',
    },
  },
  {
    id: '3',
    displayName: 'Jaydon Frankie',
    firstName: 'Jaydon',
    lastName: 'Frankie',
    email: 'customer@test.com',
    password: 'test123',
    avatar: 'https://i.pravatar.cc/150?u=JaydonFrankie',
    phoneNumber: '+40 777666555',
    address: {
      street2: '456',
      street1: 'Oak Avenue',
      city: 'London',
      state: 'Alabama',
      zipCode: 9203842,
      country: 'United States',
    },
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    userType: 'customer',
    createdAt: 1671039115000,
    updatedAt: 1671047789000,
    socials: {
      facebook: 'https://www.facebook.com/caitlyn.kerluke',
      instagram: 'https://www.facebook.com/caitlyn.kerluke',
      linkedin: 'https://www.facebook.com/caitlyn.kerluke',
    },
  },
  {
    id: '4',
    displayName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'seller2@test.com',
    password: 'newuser123',
    avatar: 'https://i.pravatar.cc/150?u=JohnDoe',
    phoneNumber: '+1 123456789',
    address: {
      street2: '789',
      street1: 'Maple Street',
      city: 'New York',
      state: 'New York',
      zipCode: 10001,
      country: 'United States',
    },
    about: 'New user with realistic data.',
    userType: 'seller',
    createdAt: 1680325689000,
    updatedAt: 1680352147000,
    socials: {
      facebook: 'https://www.facebook.com/john.doe',
      linkedin: 'https://www.linkedin.com/in/johndoe',
      twitter: 'https://www.twitter.com/johndoe',
    },
  },
  {
    id: '5',
    displayName: 'Emma Smith',
    firstName: 'Emma',
    lastName: 'Smith',
    email: 'seller3@test.com',
    password: 'customer456',
    avatar: 'https://i.pravatar.cc/150?u=EmmaSmith',
    phoneNumber: '+1 987654321',
    address: {
      street2: '123',
      street1: 'Rose Street',
      city: 'Chicago',
      state: 'Illinois',
      zipCode: 60601,
      country: 'United States',
    },
    about: 'A new customer with realistic data.',
    userType: 'seller',
    serviceType: serviceTypes[1].value,
    createdAt: 1680327890000,
    updatedAt: 1680354876000,
    socials: {
      facebook: 'https://www.facebook.com/emma.smith',
      linkedin: 'https://www.linkedin.com/in/emmasmith',
      twitter: 'https://www.twitter.com/emmasmith',
    },
  },
];

/**
 * Find user by user id
 * @param {string} id
 * @returns {User | undefined}
 */
export const getUserByID = (id) => users.find((user) => user.id === id);

/**
 * Find user by user email
 * @param {string} email
 * @returns {User | undefined}
 */
export const getUserByEmail = (email) => users.find((user) => user.email === email);

export const getUserByType = (type) => users.find((user) => user.userType === type);
export const getUserByServiceType = (serviceType) =>
  users.find((user) => user?.serviceType === serviceType);

/**
 * all seller users
 * @returns {User[]}
 */
export const getSellers = () => users.filter((user) => user.userType === 'seller');

/**
 * all customer users
 * @returns {User[]}
 */
export const getCustomers = () => users.filter((user) => user.userType === 'customer');

/**
 * find seller users
 * @param {string} id
 * @returns {Promise<User>}
 */
export const findSeller = async (id) =>
  users.find((user) => user.userType === 'seller' && user.id === id);

/**
 * find customer user
 * @param {string} id
 * @returns {Promise<User>}
 */
export const findCustomer = async (id) =>
  users.find((user) => user.userType === 'customer' && user.id === id);
