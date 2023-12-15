/**
 * User collection
 * @type {User[]}
 */
export const users = [
  {
    id: 2,
    displayName: 'Ethan Johnson',
    email: 'ethan.johnson@example.com',
    password: 'warehouse123',
    photoURL: 'https://i.pravatar.cc/150?u=EthanJohnson',
    phoneNumber: '+44 7700112233',
    country: 'United Kingdom',
    address: '456 Warehouse Lane',
    state: 'England',
    city: 'London',
    zipCode: 'WC1X 8XZ',
    about: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    role: 'warehouse',
  },
  {
    id: 3,
    displayName: 'Sophia Miller',
    email: 'sophia.miller@example.com',
    password: 'customer123',
    photoURL: 'https://i.pravatar.cc/150?u=SophiaMiller',
    phoneNumber: '+1 555666777',
    country: 'Canada',
    address: '123 Maple Street',
    state: 'Ontario',
    city: 'Toronto',
    zipCode: 'M1A 1A1',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    role: 'customer',
  },
  {
    id: 1,
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    password: 'demo1234',
    photoURL: 'https://i.pravatar.cc/150?u=JaydonFrankie',
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
  },
];

/**
 * Find user by user id
 * @param {string} id
 * @returns {User | undefined}
 */
export const getUserByID = (id) => users.find((user) => user.id === id);
