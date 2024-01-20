const warehouses = [
  {
    id: 'abc123',
    name: 'Prime Storage',
    address: {
      street2: '456',
      street1: 'Oak Avenue',
      city: 'Metropolis',
      state: 'State B',
      zipCode: '67890',
      country: 'Country Y',
    },
    description: 'Modern storage facility in the heart of the city.',
    totalSpace: 5000,
    pricePerSquare: 1.5,
    photos: [
      {
        id: '1',
        title: 'Warehouse Exterior',
        coverUrl: 'https://picsum.photos/seed/abc1231/450/318',
      },
      {
        id: '2',
        title: 'Interior View',
        coverUrl: 'https://picsum.photos/seed/abc1232/450/318',
      },
    ],
    isVerified: true,
    isFeatured: true,
  },
];

module.exports = warehouses;
