/** @type {Warehouse[]} */
export const warehouses = [
  {
    id: 'abc123',
    name: 'Prime Storage',
    region: 'northeast',
    address: {
      streetNumber: '456',
      streetAddress: 'Oak Avenue',
      city: 'Metropolis',
      state: 'State B',
      zipCode: '67890',
      country: 'Country Y',
    },
    description: 'Modern storage facility in the heart of the city.',
    totalSpace: 5000,
    price1: 1.5,
    price3: 1.2,
    price6: 1,
    price12: 0.5,
    discountRate: 30,
    maxSpaceOrder: 1000,
    minSpaceOrder: 100,
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
    sellerId: '2',
    approvedUses: {
      apparel: true,
      automotive: false,
      baseMetals: true,
      consumerProducts: false,
      electronics: true,
      industrialMaterials: false,
      Machinery: true,
    },
    features: {
      highDoors: true,
      internet: true,
      groundDoors: false,
      waterDrain: true,
      ceilingHeight: 15,
      securityCameras: true,
      heightOfRollupDoor: 12,
      specialtyPower: false,
      officeSpace: true,
      overnightParking: false,
      forkLift: true,
    },
    facilityDetails: {
      totalSpace: 5000,
      operatingHours: {
        start: 28800000,
        end: 57600000,
      },
      operatingDays: [true, false, true, true, true, true],
      facilitySecurity: '24/7 surveillance and security personnel',
      industriesServed: 'E-commerce and logistics',
      dockHighDoors: '4',
      atGradeDoors: '2',
      storageLayout: 'Rack storage',
      wmsVendor: 'Warehouse Solutions Inc.',
      clearCeilingHeight: 20,
      maxForkliftCapacity: 5000,
    },
    services: {
      addOnServiceRate: 2.5,
      inboundServices: 'Receiving and inspection',
      outboundServices: 'Order picking and packing',
      valueAddServices: 'Labeling and kitting',
      serviceRate: 3.0,
    },
    rules: [
      'No smoking inside the facility',
      'Authorized personnel only in restricted areas',
      'Proper safety gear required in operational zones',
    ],
    visible: true,
  },
  {
    id: 'def456',
    name: 'Metro Warehousing',
    region: 'midwest',
    address: {
      streetNumber: '789',
      streetAddress: 'Maple Street',
      city: 'Metropolis',
      state: 'State B',
      zipCode: '54321',
      country: 'Country Y',
    },
    description: 'Secure storage facility for various industries.',
    totalSpace: 8000,
    price1: 1.5,
    price3: 1.2,
    price6: 1,
    price12: 0.5,
    discountRate: 0,
    maxSpaceOrder: undefined,
    minSpaceOrder: undefined,
    photos: [
      {
        id: '3',
        title: 'Warehouse Exterior',
        coverUrl: 'https://picsum.photos/seed/def4561/450/318',
      },
      {
        id: '4',
        title: 'Interior View',
        coverUrl: 'https://picsum.photos/seed/def4562/450/318',
      },
    ],
    isVerified: true,
    isFeatured: true,
    sellerId: '2',
    approvedUses: {
      apparel: false,
      automotive: true,
      baseMetals: false,
      consumerProducts: true,
      electronics: false,
      industrialMaterials: true,
      Machinery: false,
    },
    features: {
      highDoors: false,
      internet: true,
      groundDoors: true,
      waterDrain: false,
      ceilingHeight: false,
      securityCameras: true,
      heightOfRollupDoor: true,
      specialtyPower: true,
      officeSpace: false,
      overnightParking: true,
      forkLift: false,
    },
    facilityDetails: {
      totalSpace: 8000,
      operatingHours: {
        start: 32400000,
        end: 64800000,
      },
      operatingDays: [true, false, true, true, true, true],
      facilitySecurity: '24/7 security and access control',
      industriesServed: 'Automotive and manufacturing',
      dockHighDoors: '6',
      atGradeDoors: '3',
      storageLayout: 'Bulk storage',
      wmsVendor: 'Logistics Pro Systems',
      clearCeilingHeight: 25,
      maxForkliftCapacity: 8000,
    },
    services: {
      addOnServiceRate: 3.0,
      inboundServices: 'Cross-docking',
      outboundServices: 'Order consolidation',
      valueAddServices: 'Custom packaging',
      serviceRate: 2.5,
    },
    rules: [
      'No open flames in the storage area',
      'Adherence to safety protocols is mandatory',
      'Report any damages or leaks immediately',
    ],
    visible: true,
  },
  {
    id: 'ghi789',
    name: 'Central Logistics Hub',
    region: 'southeast',
    address: {
      streetNumber: '101',
      streetAddress: 'Cedar Lane',
      city: 'Metropolis',
      state: 'State B',
      zipCode: '98765',
      country: 'Country Y',
    },
    description: 'Strategically located logistics and storage center.',
    totalSpace: 10000,
    price1: 1.5,
    price3: 1.2,
    price6: 1,
    price12: 0.5,
    discountRate: 50,
    maxSpaceOrder: 5000,
    minSpaceOrder: 3000,
    photos: [
      {
        id: '5',
        title: 'Warehouse Exterior',
        coverUrl: 'https://picsum.photos/seed/ghi7891/450/318',
      },
      {
        id: '6',
        title: 'Interior View',
        coverUrl: 'https://picsum.photos/seed/ghi7892/450/318',
      },
    ],
    isVerified: true,
    isFeatured: true,
    sellerId: '2',
    approvedUses: {
      apparel: true,
      automotive: true,
      baseMetals: true,
      consumerProducts: false,
      electronics: true,
      industrialMaterials: false,
      Machinery: false,
    },
    features: {
      highDoors: true,
      internet: true,
      groundDoors: true,
      waterDrain: true,
      ceilingHeight: true,
      securityCameras: true,
      heightOfRollupDoor: false,
      specialtyPower: true,
      officeSpace: true,
      overnightParking: true,
      forkLift: true,
    },
    facilityDetails: {
      totalSpace: 10000,
      operatingHours: {
        start: 28800000,
        end: 64800000,
      },
      operatingDays: [true, false, true, true, true, true],
      facilitySecurity: '24/7 monitored security system',
      industriesServed: 'Apparel and electronics',
      dockHighDoors: '8',
      atGradeDoors: '4',
      storageLayout: 'Shelving storage',
      wmsVendor: 'Supply Chain Solutions',
      clearCeilingHeight: 18,
      maxForkliftCapacity: 10000,
    },
    services: {
      addOnServiceRate: 2.8,
      inboundServices: 'Inventory management',
      outboundServices: 'Order fulfillment',
      valueAddServices: 'Quality control',
      serviceRate: 2.2,
    },
    rules: [
      'No unauthorized personnel beyond this point',
      'Emergency exits must be kept clear at all times',
      'Regular safety drills will be conducted',
    ],
    visible: true,
  },
];

/**
 * Find warehouse by id
 * @param {string} id
 * @returns {Warehouse | undefined}
 */
export const getWarehouseById = (id) => warehouses.find((w) => w.id === id);
