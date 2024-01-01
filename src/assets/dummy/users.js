/**
 * User collection
 * @type {User[]}
 */
export const users = [
  {
    id: '1',
    displayName: 'Jaydon Frankie',
    firstName: 'Jaydon',
    lastName: 'Frankie',
    email: 'demo@minimals.cc',
    password: 'demo1234',
    photoURL: 'https://i.pravatar.cc/150?u=JaydonFrankie',
    phoneNumber: '+40 777666555',
    address: {
      streetNumber: '456',
      streetAddress: 'Oak Avenue',
      city: 'London',
      state: 'Alabama',
      zipCode: 9203842,
      country: 'United States',
    },
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    region: 'Northeast',
    createdAt: 1671039115000,
    updatedAt: 1671047789000,
    socials: {
      facebook: 'https://www.facebook.com/caitlyn.kerluke',
      instagram: 'https://www.facebook.com/caitlyn.kerluke',
      linkedin: 'https://www.facebook.com/caitlyn.kerluke',
    },
  },
  {
    id: '2',
    displayName: 'Ethan Johnson',
    firstName: 'Ethan',
    lastName: 'Johnson',
    email: 'ethan.johnson@example.com',
    password: 'warehouse123',
    photoURL: 'https://i.pravatar.cc/150?u=EthanJohnson',
    phoneNumber: '+44 7700112233',
    address: {
      streetNumber: '456',
      streetAddress: 'Oak Avenue',
      city: 'London',
      state: 'Alabama',
      zipCode: 9203842,
      country: 'United States',
    },
    about: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    role: 'warehouse',
    region: 'Northeast',
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
    displayName: 'Sophia Miller',
    firstName: 'Sophia',
    lastName: 'Miller',
    email: 'sophia.miller@example.com',
    password: 'customer123',
    photoURL: 'https://i.pravatar.cc/150?u=SophiaMiller',
    phoneNumber: '+1 555666777',
    address: {
      streetNumber: '456',
      streetAddress: 'Oak Avenue',
      city: 'London',
      state: 'Alabama',
      zipCode: 9203842,
      country: 'United States',
    },
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    role: 'customer',
    region: 'Northeast',
    createdAt: 1671034821000,
    updatedAt: 1671042147000,
    socials: {
      facebook: 'https://www.facebook.com/caitlyn.kerluke',
      linkedin: 'https://www.facebook.com/caitlyn.kerluke',
      x: 'https://www.twitter.com/caitlyn.kerluke',
    },
  },
  {
    id: '4',
    displayName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'newuser123',
    photoURL: 'https://i.pravatar.cc/150?u=JohnDoe',
    phoneNumber: '+1 123456789',
    address: {
      streetNumber: '789',
      streetAddress: 'Maple Street',
      city: 'New York',
      state: 'New York',
      zipCode: 10001,
      country: 'United States',
    },
    about: 'New user with realistic data.',
    role: 'warehouse',
    region: 'South',
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
    email: 'emma.smith@example.com',
    password: 'customer456',
    photoURL: 'https://i.pravatar.cc/150?u=EmmaSmith',
    phoneNumber: '+1 987654321',
    address: {
      streetNumber: '123',
      streetAddress: 'Rose Street',
      city: 'Chicago',
      state: 'Illinois',
      zipCode: 60601,
      country: 'United States',
    },
    about: 'A new customer with realistic data.',
    role: 'customer',
    region: 'Midwest',
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
 * all warehouse users
 * @returns {User[]}
 */
export const getWarehouseUsers = () => users.filter((user) => user.role === 'warehouse');

/**
 * find warehouse users
 * @param {string} id
 * @returns {Promise<User>}
 */
export const findWarehouseUser = async (id) =>
  users.find((user) => user.role === 'warehouse' && user.id === id);
