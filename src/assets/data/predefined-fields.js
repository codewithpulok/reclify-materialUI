/**
 * predefined feature fields
 * @type {PredefinedField[]}
 */
export const features = [
  { key: 'highDoors', label: 'Dock-High Doors', type: 'boolean' },
  { key: 'internet', label: 'Internet', type: 'boolean' },
  { key: 'groundDoors', label: 'Ground Level Doors', type: 'boolean' },
  { key: 'waterDrain', label: 'Water & Drain', type: 'boolean' },
  { key: 'ceilingHeight', label: 'Ceiling Height', type: 'boolean' },
  { key: 'securityCameras', label: 'Security Cameras', type: 'boolean' },
  { key: 'heightOfRollupDoor', label: 'Height of Rollup Door', type: 'boolean' },
  { key: 'specialtyPower', label: 'Specialty Power', type: 'boolean' },
  { key: 'officeSpace', label: 'Office Space', type: 'boolean' },
  { key: 'overnightParking', label: 'Overnight Parking', type: 'boolean' },
  { key: 'forkLift', label: 'Fork lift', type: 'boolean' },
];

/**
 * predefined approved uses fields
 * @type {PredefinedField[]}
 */
export const approvedUses = [
  { key: 'apparel', label: 'Apparel', type: 'boolean' },
  { key: 'automotive', label: 'Automotive', type: 'boolean' },
  { key: 'baseMetals', label: 'Base metals', type: 'boolean' },
  { key: 'consumerProducts', label: 'Consumer Products', type: 'boolean' },
  { key: 'electronics', label: 'Electronics', type: 'boolean' },
  { key: 'industrialMaterials', label: 'Industrial Materials', type: 'boolean' },
  { key: 'Machinery', label: 'Machinery', type: 'boolean' },
];

/**
 * predefined facility fields
 * @type {PredefinedField[]}
 */
export const facility = [
  { key: 'totalSpace', label: 'Total Facility Size', type: 'number' },
  { key: 'operatingDays', label: 'Operating Days', type: 'custom' },
  { key: 'operatingHours', label: 'Operating Hours', type: 'custom' },
  { key: 'facilitySecurity', label: 'Facility Security', type: 'text' },
  { key: 'industriesServed', label: 'Industries Served', type: 'text' },
  { key: 'dockHighDoors', label: 'Dock High Doors', type: 'text' },
  { key: 'atGradeDoors', label: 'At Grade Doors', type: 'text' },
  { key: 'storageLayout', label: 'Storage Layout', type: 'text' },
  { key: 'wmsVendor', label: 'WMS Vendor', type: 'text' },
  { key: 'clearCeilingHeight', label: 'Clear Ceiling Height (feet)', type: 'number' },
  { key: 'maxForkliftCapacity', label: 'Max Forklift Capacity (lbs)', type: 'number' },
];

/**
 * predefined services fields
 * @type {PredefinedField[]}u
 */
export const services = [
  { key: 'addOnServiceRate', label: 'Add-On Service Rate', type: 'number' },
  { key: 'inboundServices', label: 'Inbound Services', type: 'text' },
  { key: 'outboundServices', label: 'Outbound Services', type: 'text' },
  { key: 'valueAddServices', label: 'Value Add Services', type: 'text' },
  { key: 'serviceRate', label: 'Service Rate', type: 'number' },
];
