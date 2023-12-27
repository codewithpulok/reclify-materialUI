/**
 * Dummy Address list
 * @type {Address[]}
 */
export const addresses = [
  {
    id: '1',
    primary: true,
    name: 'John Doe',
    phoneNumber: '+1 555-1234',
    fullAddress: '123 Main St, Cityville, USA',
    addressType: 'HOME',
    userId: '2',
  },
  {
    id: '2',
    primary: false,
    name: 'Jane Smith',
    phoneNumber: '+1 555-5678',
    fullAddress: '456 Oak St, Townsville, USA',
    addressType: 'OFFICE',
    userId: '2',
  },
  {
    id: '3',
    primary: false,
    name: 'Bob Johnson',
    phoneNumber: '+1 555-9876',
    fullAddress: '789 Pine St, Villagetown, USA',
    addressType: 'HOME',
    userId: '2',
  },
  {
    id: '4',
    primary: false,
    name: 'Alice Williams',
    phoneNumber: '+1 555-4321',
    fullAddress: '101 Cedar St, Hamletville, USA',
    addressType: 'OFFICE',
    userId: '2',
  },
  {
    id: '5',
    primary: false,
    name: 'Chris Anderson',
    phoneNumber: '+1 555-8765',
    fullAddress: '202 Birch St, Countryside, USA',
    addressType: 'HOME',
    userId: '2',
  },
  {
    id: '6',
    primary: false,
    name: 'Eva Davis',
    phoneNumber: '+1 555-5432',
    fullAddress: '303 Elm St, Suburbia, USA',
    addressType: 'OFFICE',
    userId: '2',
  },
  {
    id: '7',
    primary: false,
    name: 'Michael Brown',
    phoneNumber: '+1 555-6543',
    fullAddress: '404 Willow St, Riverside, USA',
    addressType: 'HOME',
    userId: '2',
  },
  {
    id: '8',
    primary: false,
    name: 'Olivia White',
    phoneNumber: '+1 555-2345',
    fullAddress: '505 Oak St, Lakeside, USA',
    addressType: 'OFFICE',
    userId: '2',
  },
  {
    id: '9',
    primary: false,
    name: 'Daniel Lee',
    phoneNumber: '+1 555-8765',
    fullAddress: '606 Pine St, Mountainside, USA',
    addressType: 'HOME',
    userId: '2',
  },
  {
    id: '10',
    primary: false,
    name: 'Sophia Taylor',
    phoneNumber: '+1 555-3456',
    fullAddress: '707 Cedar St, Hilltop, USA',
    addressType: 'OFFICE',
    userId: '2',
  },
];

/**
 * Find addresses by user id
 * @param {string} id
 * @returns {Address[]}
 */
export const getAddressesByUserId = (id) => addresses.filter((address) => address.userId === id);

/**
 * Find addresses by id
 * @param {string} id
 * @returns {Address | undefined}
 */
export const getAddressById = (id) => addresses.find((address) => address.id === id);

/**
 * Find primary addresses by user id
 * @param {string} id
 * @returns {Address | undefined}
 */
export const getPrimaryAddressByUserId = (id) =>
  addresses.find((address) => address.userId === id && address.primary);
