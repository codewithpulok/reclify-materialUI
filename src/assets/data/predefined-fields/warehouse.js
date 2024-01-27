/**
 * predefined feature fields
 * @type {PredefinedField[]}
 */
export const predefinedFeatures = [
  {
    key: 'highDoors',
    icon: 'solar:garage-outline',
    label: 'Dock-High Doors',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'internet',
    icon: 'tabler:wifi',
    label: 'Internet',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'groundDoors',
    icon: 'tabler:door',
    label: 'Ground Level Doors',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'waterDrain',
    icon: 'ic:baseline-water',
    label: 'Water & Drain',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'ceilingHeight',
    icon: 'tabler:arrow-autofit-height',
    label: 'Ceiling Height',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'securityCameras',
    icon: 'lucide:cctv',
    label: 'Security Cameras',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'heightOfRollupDoor',
    icon: 'fluent:auto-fit-height-24-filled',
    label: 'Height of Rollup Door',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'specialtyPower',
    icon: 'ic:outline-power',
    label: 'Specialty Power',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'officeSpace',
    icon: 'ph:office-chair-fill',
    label: 'Office Space',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'overnightParking',
    icon: 'fluent:vehicle-car-parking-24-filled',
    label: 'Overnight Parking',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'forkLift',
    icon: 'tabler:forklift',
    label: 'Fork lift',
    dataType: 'boolean',
    fieldType: 'switch',
  },
];

/**
 * predefined approved uses fields
 * @type {PredefinedField[]}
 */
export const predefinedApprovedUses = [
  {
    key: 'apparel',
    icon: 'tabler:shirt-filled',
    label: 'Apparel',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'automotive',
    icon: 'mingcute:car-fill',
    label: 'Automotive',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'baseMetals',
    icon: 'ic:baseline-gavel',
    label: 'Base metals',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'consumerProducts',
    icon: 'icon-park-outline:ad-product',
    label: 'Consumer Products',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'electronics',
    icon: 'bx:chip',
    label: 'Electronics',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'industrialMaterials',
    icon: 'cil:industry',
    label: 'Industrial Materials',
    dataType: 'boolean',
    fieldType: 'switch',
  },
  {
    key: 'Machinery',
    icon: 'line-md:cog-loop',
    label: 'Machinery',
    dataType: 'boolean',
    fieldType: 'switch',
  },
];

/**
 * predefined facility fields
 * @type {PredefinedField[]}
 */
export const predefinedFacility = [
  {
    key: 'totalSpace',
    icon: 'material-symbols-light:align-justify-space-around-rounded',
    label: 'Total Facility Size (Square Feet)',
    dataType: 'number',
    fieldType: 'text-field',
  },
  {
    key: 'operatingDays',
    icon: 'lucide:calendar-days',
    label: 'Operating Days',
    dataType: 'array',
    fieldType: 'days-picker',
  },
  {
    key: 'operatingHours',
    icon: 'mdi:shop-hours-outline',
    label: 'Operating Hours',
    dataType: 'object',
    fieldType: 'time-picker',
  },
  {
    key: 'facilitySecurity',
    icon: 'ic:twotone-security',
    label: 'Facility Security',
    dataType: 'string',
    fieldType: 'text-field',
  },
  {
    key: 'industriesServed',
    icon: 'streamline:industry-innovation-and-infrastructure',
    label: 'Industries Served',
    dataType: 'string',
    fieldType: 'text-field',
  },
  {
    key: 'dockHighDoors',
    icon: 'ph:door-duotone',
    label: 'Dock High Doors',
    dataType: 'string',
    fieldType: 'text-field',
  },
  {
    key: 'atGradeDoors',
    icon: 'game-icons:door-handle',
    label: 'At Grade Doors',
    dataType: 'string',
    fieldType: 'text-field',
  },
  {
    key: 'storageLayout',
    icon: 'icon-park-twotone:layout-four',
    label: 'Storage Layout',
    dataType: 'string',
    fieldType: 'text-field',
  },
  {
    key: 'wmsVendor',
    icon: 'gis:wms',
    label: 'WMS Vendor',
    type: 'string',
    fieldType: 'text-field',
  },
  {
    key: 'clearCeilingHeight',
    icon: 'material-symbols:height-rounded',
    label: 'Clear Ceiling Height (feet)',
    dataType: 'number',
    fieldType: 'text-field',
  },
  {
    key: 'maxForkliftCapacity',
    icon: 'material-symbols:forklift-rounded',
    label: 'Max Forklift Capacity (lbs)',
    dataType: 'number',
    fieldType: 'text-field',
  },
];

/**
 * predefined services fields
 * @type {PredefinedField[]}u
 */
export const predefinedServices = [
  {
    key: 'addOnServiceRate',
    icon: 'streamline:application-add-solid',
    label: 'Add-On Service Rate',
    dataType: 'number',
    fieldType: 'text-field',
  },
  {
    icon: 'mdi:invoice-inbound-outline',
    key: 'inboundServices',
    label: 'Inbound Services',
    dataType: 'string',
    fieldType: 'text-field',
  },
  {
    icon: 'ic:twotone-outbound',
    key: 'outboundServices',
    label: 'Outbound Services',
    dataType: 'string',
    fieldType: 'text-field',
  },
  {
    icon: 'ic:round-add-reaction',
    key: 'valueAddServices',
    label: 'Value Add Services',
    dataType: 'string',
    fieldType: 'text-field',
  },
  {
    icon: 'ic:twotone-rate-review',
    key: 'serviceRate',
    label: 'Service Rate',
    dataType: 'number',
    fieldType: 'text-field',
  },
];
