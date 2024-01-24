export const services = [
  {
    id: 'test',
    userId: '',
    type: 'transportation',
    features: {
      freight: true,
      air: false,
      rail: true,
      courier: false,
      intermodal: true,
      last: false,
      refrigerated: false,
      trucking: true,
      heavy: true,
      drayage: false,
      ocean: true,
      'freight-cons': false,
      customs: true,
      parcel: false,
      owneroperator: true,
    },
    photos: [
      {
        id: '1',
        title: 'Warehouse Exterior',
        link: 'https://picsum.photos/seed/abc1231/450/318',
      },
      {
        id: '2',
        title: 'Interior View',
        link: 'https://picsum.photos/seed/abc1232/450/318',
      },
    ],
    description: 'This is a dummy description for the transportation service.',
    keyFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
    clientList: 'Client X, Client Y, Client Z',
    businessSize: 75,
    foundedYear: 1850,
    cta: 'Call us now for transportation services!',
    promoCode: 'XyZ123',
  },
];

export const getServiceById = (id = 'test') => services.find((s) => s.id === id);

export const getServices = () => services;
export const getServicesByType = (type) => services.filter((s) => s.type === type);
