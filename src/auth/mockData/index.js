// Create and Export a dummy list of users, until we integrate with a real database/server
export const TEMP_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlOTkyZTJmNi1mNWI4LTQ1OTUtYjRkNS04NzVjOWE4NDAwOWYiLCJlbWFpbCI6ImFybXVnaGFuLnNoYWhpZEBjb2RlLWh1ZGRsZS5jb20iLCJpYXQiOjE3MDE4NjY2NjAsImV4cCI6MTcwMzE2MjY2MH0.1c3FDHCkmBTwF402oZ4EpOqmmkzQzr4rapf9g9GY1Ag';

/** @type {AuthUser[]} */
export const UsersList = [
  {
    id: '1',
    email: 'adminA@test.com',
    password: 'test123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'warehouseA@test.com',
    password: 'test123',
    firstName: 'Seller',
    lastName: 'User',
    role: 'seller',
  },
  {
    id: '3',
    email: 'customerA@test.com',
    password: 'test123',
    firstName: 'Customer',
    lastName: 'User',
    role: 'customer',
  },
];
