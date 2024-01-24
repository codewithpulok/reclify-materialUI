export const serviceTypes = [
  {
    label: 'Warehouse',
    value: 'warehouse',
    subtypes: [],
  },
  {
    label: 'Transportation',
    value: 'transportation',
    subtypes: [
      {
        value: 'freight',
        label: 'Freight Forwarders',
      },
      {
        value: 'air',
        label: 'Air Cargo Services',
      },
      {
        value: 'rail',
        label: 'Rail Freight Services',
      },
      {
        value: 'courier',
        label: 'Courier and White Glove Delivery Services',
      },
      {
        value: 'intermodal',
        label: 'Intermodal Transportation Providers',
      },
      {
        value: 'last',
        label: 'Last-Mile Delivery Services',
      },
      {
        value: 'refrigerated',
        label: 'Refrigerated Transport Services',
      },
      {
        value: 'trucking',
        label: 'Trucking FTL/LTL',
      },
      {
        value: 'heavy',
        label: 'Heavy Haul/Oversized Load',
      },
      {
        value: 'drayage',
        label: 'Drayage Services',
      },
      {
        value: 'ocean',
        label: 'Ocean Freight Services',
      },
      {
        value: 'freight-cons',
        label: 'Freight Consolidators',
      },
      {
        value: 'customs',
        label: 'Customs Brokers',
      },
      {
        value: 'parcel',
        label: 'Parcel Carriers',
      },
      {
        value: 'owneroperator',
        label: 'Owner/Operator Trucking',
      },
    ],
  },
  {
    label: 'Software',
    value: 'software',
    subtypes: [
      {
        value: 'tms',
        label: 'TMS (Transportation Management System)',
      },
      {
        value: 'erp',
        label: 'ERP (Enterprise Resource Planning) Software',
      },
      {
        value: 'wms',
        label: 'WMS (Warehouse Management System',
      },
      {
        value: 'oms',
        label: 'OMS (Order Management System)',
      },
      {
        value: 'fleet',
        label: 'Fleet Management Software',
      },
      {
        value: 'demand',
        label: 'Demand Planning Software',
      },
      {
        value: 'supplier',
        label: 'Supplier Relationship Management (SRM) Software',
      },
      {
        value: 'labor',
        label: 'Labor Management System (LMS)',
      },
      {
        value: 'warehouse-auto',
        label: 'Warehouse Automation & Robotics',
      },
      {
        value: 'dock',
        label: 'Dock Scheduling Software',
      },
      {
        value: 'ecommerce',
        label: 'Ecommerce Seller Softwares',
      },
      {
        value: 'website',
        label: 'Website Development',
      },
      {
        value: 'photovideo',
        label: 'Photo/Video Software',
      },
    ],
  },
  {
    label: 'Packaging & Supply',
    value: 'packaging',
    subtypes: [
      {
        value: 'packaging-mate',
        label: 'Packaging Material Suppliers',
      },
      {
        value: 'custom',
        label: 'Custom Packaging & Design',
      },
      {
        value: 'production',
        label: 'Production Machinery Suppliers',
      },
      {
        value: 'adhesive',
        label: 'Adhesive and Tape Suppliers',
      },
      {
        value: 'drum',
        label: 'Drum and Barrel Suppliers',
      },
      {
        value: 'eco',
        label: 'Eco-Friendly Packaging Solutions',
      },
      {
        value: 'forklift',
        label: 'Forklift & Equipment',
      },
      {
        value: 'retail',
        label: 'Retail Packaging Solutions',
      },
      {
        value: 'packaging-test',
        label: 'Packaging Testing and Quality Assurance Services',
      },
      {
        value: 'recycling',
        label: 'Recycling Services',
      },
      {
        value: 'pallet',
        label: 'Pallet Suppliers',
      },
    ],
  },
  {
    label: 'Manufacturing/Wholesale',
    value: 'manufacturing',
    subtypes: [
      {
        value: 'raw',
        label: 'Raw Material Suppliers',
      },
      {
        value: 'electronics',
        label: 'Electronics Manufacturers',
      },
      {
        value: 'furniture',
        label: 'Furniture Manufacturers',
      },
      {
        value: 'chemical',
        label: 'Chemical Manufacturers',
      },
      {
        value: 'food',
        label: 'Food and Beverage Manufacturers',
      },
      {
        value: 'plastics',
        label: 'Plastics Manufacturers',
      },
      {
        value: 'textile',
        label: 'Textile Manufacturers',
      },
      {
        value: 'metal',
        label: 'Metal Fabricators',
      },
      {
        value: 'home',
        label: 'Home Goods Manufacturers',
      },
      {
        value: 'personal',
        label: 'Personal Care Product Manufacturers',
      },
      {
        value: 'sporting',
        label: 'Sporting Goods Manufacturers',
      },
      {
        value: 'medical',
        label: 'Medical Equipment Manufacturers',
      },
      {
        value: 'toy',
        label: 'Toy Manufacturers',
      },
      {
        value: 'cosmetic',
        label: 'Cosmetic Product Manufacturers',
      },
      {
        value: 'wholesalers',
        label: 'Wholesalers',
      },
      {
        value: 'liquidators',
        label: 'Liquidators',
      },
      {
        value: 'retail-chains',
        label: 'Retail Chains',
      },
    ],
  },
  {
    label: 'Marketing/Creative',
    value: 'marketing',
    subtypes: [
      {
        value: 'graphic',
        label: 'Graphic Design Services',
      },
      {
        value: 'branding',
        label: 'Branding Agencies',
      },
      {
        value: 'content',
        label: 'Content Marketing Agencies',
      },
      {
        value: 'social',
        label: 'Social Media Marketing Agencies',
      },
      {
        value: 'public',
        label: 'Public Relations Agencies',
      },
      {
        value: 'copywriting',
        label: 'Copywriting Services',
      },
      {
        value: 'web',
        label: 'Web Design and Development Agencies',
      },
      {
        value: 'search',
        label: 'Search Engine Optimization (SEO) Agencies',
      },
      {
        value: 'email',
        label: 'Email Marketing Services',
      },
      {
        value: 'influencer',
        label: 'Influencer Marketing Agencies',
      },
      {
        value: 'event',
        label: 'Event Planning and Management Services',
      },
      {
        value: 'photography',
        label: 'Photography Services',
      },
      {
        value: 'marketing-auto',
        label: 'Marketing Automation Services',
      },
      {
        value: 'trade',
        label: 'Trade Shows & Events',
      },
      {
        value: 'podcast',
        label: 'Podcast Production Services',
      },
      {
        value: 'media',
        label: 'Media Buying and Planning Agencies',
      },
      {
        value: 'user',
        label: 'User Experience (UX) Design Services',
      },
      {
        value: 'sms',
        label: 'SMS Marketing Services',
      },
      {
        value: 'merchandising',
        label: 'Merchandising and Promotional Materials Design',
      },
    ],
  },
  {
    label: 'Consultants',
    value: 'consultants',
    subtypes: [
      {
        value: 'logistics',
        label: 'Logistics Strategy Consultants',
      },
      {
        value: 'supply',
        label: 'Supply Chain Consultants',
      },
      {
        value: 'ecommerce-business',
        label: 'Ecommerce Business Consultants',
      },
      {
        value: 'sustainability',
        label: 'Sustainability Consultants',
      },
      {
        value: 'thirdparty',
        label: 'Third-Party Logistics (3PL) Consultants',
      },
      {
        value: 'lean',
        label: 'Lean and Six Sigma Consultants',
      },
      {
        value: 'risk',
        label: 'Risk Management Consultants',
      },
      {
        value: 'customer',
        label: 'Customer Experience Consultants',
      },
      {
        value: 'market',
        label: 'Market Entry Strategy Consultants',
      },
      {
        value: 'creative',
        label: 'Creative Consultancy Services',
      },
    ],
  },
];

export const getAllServiceTypes = () => serviceTypes;
export const getAvailableServiceTypes = () => serviceTypes.slice(1); // services without the warehouse
export const getServiceType = (value) => serviceTypes.find((s) => s.value === value);
