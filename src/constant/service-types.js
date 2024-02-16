export const serviceTypes = [
  {
    label: 'Warehouse',
    value: 'warehouse',
    subtypes: [],
  },
  {
    icon: 'solar:delivery-bold-duotone',
    label: 'Transportation',
    value: 'transportation',
    subtypes: [
      {
        value: 'freight',
        label: 'Freight Forwarder',
        icon: 'bi:train-freight-front',
      },
      {
        value: 'air',
        label: 'Air Cargo Service',
        icon: 'akar-icons:air',
      },
      {
        value: 'rail',
        label: 'Rail Freight Service',
        icon: 'icon-park-twotone:high-speed-rail',
      },
      {
        value: 'courier',
        label: 'Courier and White Glove Delivery Service',
        icon: 'mdi:courier-fast',
      },
      {
        value: 'intermodal',
        label: 'Intermodal Transportation Provider',
        icon: 'mdi:train-car-intermodal',
      },
      {
        value: 'last',
        label: 'Last-Mile Delivery Service',
        icon: 'icon-park-outline:delivery',
      },
      {
        value: 'refrigerated',
        label: 'Refrigerated Transport Service',
        icon: 'icon-park-twotone:refrigerator',
      },
      {
        value: 'trucking',
        label: 'Trucking FTL/LTL',
        icon: 'fluent:vehicle-truck-20-regular',
      },
      {
        value: 'heavy',
        label: 'Heavy Haul/Oversized Load',
        icon: 'bi:minecart-loaded',
      },
      {
        value: 'drayage',
        label: 'Drayage Service',
        icon: 'ic:twotone-room-service',
      },
      {
        value: 'ocean',
        label: 'Ocean Freight Service',
        icon: 'mdi:ocean',
      },
      {
        value: 'freight-cons',
        label: 'Freight Consolidator',
        icon: 'bi:train-freight-front-fill',
      },
      {
        value: 'customs',
        label: 'Customs Broker',
        icon: 'mdi:iobroker',
      },
      {
        value: 'parcel',
        label: 'Parcel Carrier',
        icon: 'carbon:delivery-parcel',
      },
      {
        value: 'owneroperator',
        label: 'Owner/Operator Trucking',
        icon: 'ph:truck-duotone',
      },
    ],
  },
  {
    icon: 'icon-park-twotone:application-one',
    label: 'Software',
    value: 'software',
    subtypes: [
      {
        value: 'tms',
        label: 'TMS (Transportation Management System)',
        icon: 'icon-park-twotone:transport',
      },
      {
        value: 'erp',
        label: 'ERP (Enterprise Resource Planning) Software',
        icon: 'ic:twotone-dashboard',
      },
      {
        value: 'wms',
        label: 'WMS (Warehouse Management System',
        icon: 'gis:wms',
      },
      {
        value: 'oms',
        label: 'OMS (Order Management System)',
        icon: 'guidance:customs',
      },
      {
        value: 'fleet',
        label: 'Fleet Management Software',
        icon: 'mdi:fleet',
      },
      {
        value: 'demand',
        label: 'Demand Planning Software',
        icon: 'ic:twotone-ondemand-video',
      },
      {
        value: 'supplier',
        label: 'Supplier Relationship Management (SRM) Software',
        icon: 'carbon:scis-transparent-supply',
      },
      {
        value: 'labor',
        label: 'Labor Management System (LMS)',
        icon: 'icon-park-twotone:worker',
      },
      {
        value: 'warehouse-auto',
        label: 'Warehouse Automation & Robotics',
        icon: 'vaadin:automation',
      },
      {
        value: 'dock',
        label: 'Dock Scheduling Software',
        icon: 'vaadin:automation',
      },
      {
        value: 'ecommerce',
        label: 'Ecommerce Seller Software',
        icon: 'solar:shop-line-duotone',
      },
      {
        value: 'website',
        label: 'Website Development',
        icon: 'gg:website',
      },
      {
        value: 'photovideo',
        label: 'Photo/Video Software',
        icon: 'tabler:photo-video',
      },
    ],
  },
  {
    icon: 'ph:package-duotone',
    label: 'Packaging & Supply',
    value: 'packaging',
    subtypes: [
      {
        value: 'packaging-mate',
        label: 'Packaging Material Supplier',
        icon: 'mdi:package-outline',
      },
      {
        value: 'custom',
        label: 'Custom Packaging & Design',
        icon: 'ph:package-duotone',
      },
      {
        value: 'production',
        label: 'Production Machinery Supplier',
        icon: 'fluent:production-checkmark-20-filled',
      },
      {
        value: 'adhesive',
        label: 'Adhesive and Tape Supplier',
        icon: 'la:tape',
      },
      {
        value: 'drum',
        label: 'Drum and Barrel Supplier',
        icon: 'lucide:drum',
      },
      {
        value: 'eco',
        label: 'Eco-Friendly Packaging Solution',
        icon: 'ic:twotone-eco',
      },
      {
        value: 'forklift',
        label: 'Forklift & Equipment',
        icon: 'material-symbols:forklift-rounded',
      },
      {
        value: 'retail',
        label: 'Retail Packaging Solution',
        icon: 'fluent:building-retail-20-regular',
      },
      {
        value: 'packaging-test',
        label: 'Packaging Testing and Quality Assurance Service',
        icon: 'ph:test-tube-duotone',
      },
      {
        value: 'recycling',
        label: 'Recycling Service',
        icon: 'material-symbols:recycling',
      },
      {
        value: 'pallet',
        label: 'Pallet Supplier',
        icon: 'carbon:scis-transparent-supply',
      },
    ],
  },
  {
    icon: 'material-symbols:precision-manufacturing-outline-rounded',
    label: 'Manufacturing/Wholesale',
    value: 'manufacturing',
    subtypes: [
      {
        value: 'raw',
        label: 'Raw Material Supplier',
        icon: 'carbon:raw',
      },
      {
        value: 'electronics',
        label: 'Electronics Manufacturer',
        icon: 'iconoir:electronics-chip',
      },
      {
        value: 'furniture',
        label: 'Furniture Manufacturer',
        icon: 'map:furniture-store',
      },
      {
        value: 'chemical',
        label: 'Chemical Manufacturer',
        icon: 'game-icons:chemical-drop',
      },
      {
        value: 'food',
        label: 'Food and Beverage Manufacturer',
        icon: 'pajamas:food',
      },
      {
        value: 'plastics',
        label: 'Plastics Manufacturer',
        icon: 'cbi:garbage-plastic',
      },
      {
        value: 'textile',
        label: 'Textile Manufacturer',
        icon: 'ph:dress-duotone',
      },
      {
        value: 'metal',
        label: 'Metal Fabricator',
        icon: 'icon-park-outline:heavy-metal',
      },
      {
        value: 'home',
        label: 'Home Goods Manufacturer',
        icon: 'solar:home-line-duotone',
      },
      {
        value: 'personal',
        label: 'Personal Care Product Manufacturer',
        icon: 'icon-park-twotone:personal-collection',
      },
      {
        value: 'sporting',
        label: 'Sporting Goods Manufacturer',
        icon: 'fluent:sport-24-regular',
      },
      {
        value: 'medical',
        label: 'Medical Equipment Manufacturer',
        icon: 'solar:medical-kit-bold-duotone',
      },
      {
        value: 'toy',
        label: 'Toy Manufacturer',
        icon: 'ic:twotone-smart-toy',
      },
      {
        value: 'cosmetic',
        label: 'Cosmetic Product Manufacturer',
        icon: 'solar:cosmetic-bold-duotone',
      },
      {
        value: 'wholesaler',
        label: 'Wholesaler',
        icon: 'solar:sale-bold-duotone',
      },
      {
        value: 'liquidator',
        label: 'Liquidator',
        icon: 'mdi:cup-liquid',
      },
      {
        value: 'retail-chain',
        label: 'Retail Chain',
        icon: 'fluent:building-retail-more-24-filled',
      },
    ],
  },
  {
    icon: 'nimbus:marketing',
    label: 'Marketing/Creative',
    value: 'marketing',
    subtypes: [
      {
        value: 'graphic',
        label: 'Graphic Design Service',
        icon: 'icon-park-twotone:graphic-stitching-four',
      },
      {
        value: 'branding',
        label: 'Branding Agency',
        icon: 'ic:twotone-branding-watermark',
      },
      {
        value: 'content',
        label: 'Content Marketing Agency',
        icon: 'ic:twotone-content-paste',
      },
      {
        value: 'social',
        label: 'Social Media Marketing Agency',
        icon: 'tabler:social',
      },
      {
        value: 'public',
        label: 'Public Relations Agency',
        icon: 'ic:twotone-public',
      },
      {
        value: 'copywriting',
        label: 'Copywriting Service',
        icon: 'solar:copy-bold-duotone',
      },
      {
        value: 'web',
        label: 'Web Design and Development Agency',
        icon: 'ic:twotone-web',
      },
      {
        value: 'search',
        label: 'Search Engine Optimization (SEO) Agency',
        icon: 'iconamoon:search-duotone',
      },
      {
        value: 'email',
        label: 'Email Marketing Service',
        icon: 'ic:twotone-email',
      },
      {
        value: 'influencer',
        label: 'Influencer Marketing Agency',
        icon: 'file-icons:influxdata',
      },
      {
        value: 'event',
        label: 'Event Planning and Management Service',
        icon: 'material-symbols:event',
      },
      {
        value: 'photography',
        label: 'Photography Service',
        icon: 'ic:twotone-photo',
      },
      {
        value: 'marketing-auto',
        label: 'Marketing Automation Service',
        icon: 'nimbus:marketing',
      },
      {
        value: 'trade',
        label: 'Trade Shows & Events',
        icon: 'game-icons:trade',
      },
      {
        value: 'podcast',
        label: 'Podcast Production Service',
        icon: 'solar:podcast-bold-duotone',
      },
      {
        value: 'media',
        label: 'Media Buying and Planning Agency',
        icon: 'ic:twotone-perm-media',
      },
      {
        value: 'user',
        label: 'User Experience (UX) Design Service',
        icon: 'ph:user-duotone',
      },
      {
        value: 'sms',
        label: 'SMS Marketing Service',
        icon: 'ic:twotone-sms',
      },
      {
        value: 'merchandising',
        label: 'Merchandising and Promotional Materials Design',
        icon: 'solar:shop-bold-duotone',
      },
    ],
  },
  {
    icon: 'ic:twotone-support',
    label: 'Consultants',
    value: 'consultants',
    subtypes: [
      {
        value: 'logistics',
        label: 'Logistics Strategy Consultant',
        icon: 'solar:login-3-bold-duotone',
      },
      {
        value: 'supply',
        label: 'Supply Chain Consultant',
        icon: 'carbon:scis-transparent-supply',
      },
      {
        value: 'ecommerce-business',
        label: 'Ecommerce Business Consultant',
        icon: 'icon-park-twotone:user-business',
      },
      {
        value: 'sustainability',
        label: 'Sustainability Consultant',
        icon: 'carbon:sustainability',
      },
      {
        value: 'thirdparty',
        label: 'Third-Party Logistics (3PL) Consultant',
        icon: 'icon-park-twotone:one-third-rotation',
      },
      {
        value: 'lean',
        label: 'Lean and Six Sigma Consultant',
        icon: 'la:leanpub',
      },
      {
        value: 'risk',
        label: 'Risk Management Consultant',
        icon: 'ph:warning-duotone',
      },
      {
        value: 'customer',
        label: 'Customer Experience Consultant',
        icon: 'carbon:customer-service',
      },
      {
        value: 'market',
        label: 'Market Entry Strategy Consultant',
        icon: 'healthicons:market-stall-outline',
      },
      {
        value: 'creative',
        label: 'Creative Consultancy Service',
        icon: 'icon-park-twotone:creative',
      },
    ],
  },
];

export const getAllServiceTypes = () => serviceTypes;
export const getAvailableServiceTypes = () => serviceTypes.slice(1); // services without the warehouse
export const getServiceType = (value) => serviceTypes.find((s) => s.value === value);
