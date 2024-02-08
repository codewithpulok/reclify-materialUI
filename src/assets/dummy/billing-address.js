const billingAddress = [
  {
    id: '2',
    userId: '2',
    fullName: 'Jane Smith',
    primary: false,
    address: {
      city: 'New York',
      country: 'United States',
      state: 'New York',
      street1: '789 Broadway',
      street2: 101,
      zipCode: 10001,
    },
    phoneNumber: '555-5678',
    email: 'jane.smith@example.com',
  },
  {
    id: '1',
    userId: '2',
    fullName: 'John Doe',
    primary: true,
    address: {
      city: 'San Francisco',
      country: 'United States',
      state: 'California',
      street1: '456 Oak Street',
      street2: 789,
      zipCode: 94110,
    },
    phoneNumber: '555-1234',
    email: 'john.doe@example.com',
  },
  {
    id: '3',
    userId: '3',
    fullName: 'Alice Johnson',
    primary: true,
    address: {
      city: 'Los Angeles',
      country: 'United States',
      state: 'California',
      street1: '123 Pine Street',
      street2: 456,
      zipCode: '90001',
    },
    phoneNumber: '555-9876',
    email: 'alice.johnson@example.com',
  },
  {
    id: '4',
    userId: '3',
    fullName: 'Bob Williams',
    primary: false,
    address: {
      city: 'Chicago',
      country: 'United States',
      state: 'Illinois',
      street1: '789 Oak Avenue',
      street2: 202,
      zipCode: '60601',
    },
    phoneNumber: '555-5432',
    email: 'bob.williams@example.com',
  },
];
/**
 * get billing address for specific user
 * @param {string} id
 * @returns {BillingAddress[]}
 */
export const getBillingAddressByUserId = (id) => billingAddress.filter((b) => b.userId === id);
