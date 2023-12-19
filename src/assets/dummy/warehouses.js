/**
 * @type {Warehouse[]}
 */
export const warehouses = [
  {
    id: 'abc123',
    name: 'Prime Storage',
    location: 'City Center',
    description: 'Modern storage facility in the heart of the city.',
    totalSpace: 5000,
    pricePerSquare: 1.5,
    photos: [
      {
        id: '1',
        title: 'Warehouse Exterior',
        coverUrl: 'https://picsum.photos/seed/abc1231/450/318',
      },
      { id: '2', title: 'Interior View', coverUrl: 'https://picsum.photos/seed/abc1232/450/318' },
    ],
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 'def456',
    name: 'Metro Warehousing',
    location: 'Industrial Zone',
    description: 'Spacious warehouses in the bustling industrial zone.',
    totalSpace: 8000,
    pricePerSquare: 1.2,
    photos: [
      {
        id: '3',
        title: 'Industrial Zone View',
        coverUrl: 'https://picsum.photos/seed/def4563/450/318',
      },
      { id: '4', title: 'Storage Area', coverUrl: 'https://picsum.photos/seed/def4564/450/318' },
    ],
    isVerified: false,
    isFeatured: false,
  },
  {
    id: 'ghi789',
    name: 'Skyline Depot',
    location: 'Suburbia',
    description:
      'Discover the allure of our warehouses, strategically nestled in a serene suburban setting. Unveil a unique blend of functionality and aesthetics as you explore storage spaces with a breathtaking view. Our warehouses redefine the storage experience, providing not just a practical solution but also an environment that embraces tranquility. The peaceful suburban surroundings create an idyllic backdrop for your storage needs, offering a retreat-like atmosphere away from the hustle and bustle of urban life. Immerse yourself in the harmonious coexistence of practical storage solutions and the scenic beauty that our warehouses with a view have to offer.',
    totalSpace: 6000,
    pricePerSquare: 1.8,
    photos: [
      {
        id: '5',
        title: 'Suburban Landscape',
        coverUrl: 'https://picsum.photos/seed/ghi7895/450/318',
      },
      {
        id: '6',
        title: 'Warehouse Entrance',
        coverUrl: 'https://picsum.photos/seed/ghi7896/450/318',
      },
    ],
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 'jkl012',
    name: 'Urban Storage',
    location: 'Downtown',
    description: 'Storage facilities in the heart of the downtown area.',
    totalSpace: 3500,
    pricePerSquare: 2.0,
    photos: [
      {
        id: '7',
        title: 'Downtown Skyline',
        coverUrl: 'https://picsum.photos/seed/jkl0127/450/318',
      },
      { id: '8', title: 'Cityscape', coverUrl: 'https://picsum.photos/seed/jkl0128/450/318' },
    ],
    isVerified: true,
    isFeatured: false,
  },
  {
    id: 'mno345',
    name: 'Harbor Warehouses',
    location: 'Port Area',
    description: 'Warehouses near the bustling port for easy shipping access.',
    totalSpace: 10000,
    pricePerSquare: 1.0,
    photos: [
      { id: '9', title: 'Harbor View', coverUrl: 'https://picsum.photos/seed/mno3459/450/318' },
      {
        id: '10',
        title: 'Dockside Storage',
        coverUrl: 'https://picsum.photos/seed/mno34510/450/318',
      },
    ],
    isVerified: false,
    isFeatured: true,
  },
  {
    id: 'pqr678',
    name: 'Green Valley Storage',
    location: 'Rural Area',
    description: 'Warehouses in a peaceful green valley surrounded by nature.',
    totalSpace: 7000,
    pricePerSquare: 1.6,
    photos: [
      {
        id: '11',
        title: 'Rural Landscape',
        coverUrl: 'https://picsum.photos/seed/pqr67811/450/318',
      },
      { id: '12', title: 'Green Storage', coverUrl: 'https://picsum.photos/seed/pqr67812/450/318' },
    ],
    isVerified: false,
    isFeatured: false,
  },
  {
    id: 'stu901',
    name: 'Tech Hub Warehouses',
    location: 'Tech District',
    description: 'Modern warehouses in the thriving tech district.',
    totalSpace: 4500,
    pricePerSquare: 1.9,
    photos: [
      {
        id: '13',
        title: 'Tech District View',
        coverUrl: 'https://picsum.photos/seed/stu90113/450/318',
      },
      {
        id: '14',
        title: 'Modern Facilities',
        coverUrl: 'https://picsum.photos/seed/stu90114/450/318',
      },
    ],
    isVerified: true,
    isFeatured: true,
  },
  {
    id: 'vwx234',
    name: 'Golden Storage',
    location: 'Financial District',
    description: 'Luxurious storage options in the heart of the financial district.',
    totalSpace: 9000,
    pricePerSquare: 1.3,
    photos: [
      {
        id: '15',
        title: 'Financial District Skyline',
        coverUrl: 'https://picsum.photos/seed/vwx23415/450/318',
      },
      {
        id: '16',
        title: 'Luxury Warehousing',
        coverUrl: 'https://picsum.photos/seed/vwx23416/450/318',
      },
    ],
    isVerified: false,
    isFeatured: false,
  },
  {
    id: 'yzu567',
    name: 'Mountain View Warehousing',
    location: 'Mountain Area',
    description: 'Warehouses with a stunning view of the mountains.',
    totalSpace: 5500,
    pricePerSquare: 1.7,
    photos: [
      {
        id: '17',
        title: 'Mountain Range',
        coverUrl: 'https://picsum.photos/seed/yzu56717/450/318',
      },
      {
        id: '18',
        title: 'Warehouse on the Hill',
        coverUrl: 'https://picsum.photos/seed/yzu56718/450/318',
      },
    ],
    isVerified: true,
    isFeatured: false,
  },
  {
    id: '123abc',
    name: 'Sunset Storage',
    location: 'Beachside',
    description: 'Storage facilities with a beautiful sunset view near the beach.',
    totalSpace: 4000,
    pricePerSquare: 2.2,
    photos: [
      { id: '19', title: 'Beach Sunset', coverUrl: 'https://picsum.photos/seed/123abc19/450/318' },
      {
        id: '20',
        title: 'Coastal Warehouse',
        coverUrl: 'https://picsum.photos/seed/123abc20/450/318',
      },
    ],
    isVerified: false,
    isFeatured: true,
  },
];
