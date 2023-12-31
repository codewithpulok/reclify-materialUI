const billingAddress = [
  {
    id: '2',
    userId: '2',
    fullName: 'Jane Smith',
    primary: false,
    addressType: 'work',
    address: {
      city: 'New York',
      country: 'United States',
      state: 'New York',
      streetAddress: '789 Broadway',
      streetNumber: 101,
      zipCode: 10001,
    },
    phoneNumber: '555-5678',
  },
  {
    id: '1',
    userId: '2',
    fullName: 'John Doe',
    primary: true,
    addressType: 'home',
    address: {
      city: 'San Francisco',
      country: 'United States',
      state: 'California',
      streetAddress: '456 Oak Street',
      streetNumber: 789,
      zipCode: 94110,
    },
    phoneNumber: '555-1234',
  },
  {
    id: '3',
    userId: '3',
    fullName: 'Alice Johnson',
    primary: true,
    addressType: 'home',
    address: {
      city: 'Los Angeles',
      country: 'United States',
      state: 'California',
      streetAddress: '123 Pine Street',
      streetNumber: 'Apt 456',
      zipCode: '90001',
    },
    phoneNumber: '555-9876',
  },
  {
    id: '4',
    userId: '3',
    fullName: 'Bob Williams',
    primary: false,
    addressType: 'work',
    address: {
      city: 'Chicago',
      country: 'United States',
      state: 'Illinois',
      streetAddress: '789 Oak Avenue',
      streetNumber: 'Suite 202',
      zipCode: '60601',
    },
    phoneNumber: '555-5432',
  },
];

/**
 * get billing address for specific user
 * @param {string} id
 * @returns {BillingAddress[]}
 */
export const getBillingAddressByUserId = (id) => billingAddress.filter((b) => b.userId === id);
