/**
 * Represents information about Warehouse Info.
 * @typedef {Object} Warehouse
 * @property {string} id - The unique identifier for warehouse.
 * @property {string} name - The name of the warehouse, in this case, 'Ware House'.
 * @property {WarehouseAddress} address - The address of the warehouse
 * @property {string} description - The description of the warehouse, e.g., 'Modern storage facility in the heart of the city.'.
 * @property {number} totalSpace - The total space of the warehouse in pallet, e.g., 5000.
 * @property {number} pricePerSpace - The price of the warehouse space per pallet, e.g., 1.5.
 * @property {number | undefined} minSpaceOrder - The minimum space to order.
 * @property {number | undefined} maxSpaceOrder - The maximum space to order.
 * @property {number} discountRate - The discount rate for warehouse (percentage) .
 * @property {Photo[]} photos - An array of photo objects representing the warehouse's photos.
 * @property {boolean} isVerified - Warehouse is verified by admin or not.
 * @property {boolean} isFeatured - Warehouse is featured or not.
 * @property {string} sellerId - The unique identifier of the seller associated with the warehouse.
 * @property {WarehouseApprovedUses} approvedUses - Object representing approved uses for the warehouse.
 * @property {WarehouseFeatures} features - Object representing features available in the warehouse.
 * @property {WarehouseFacilityDetails} facilityDetails - Object representing details about the warehouse facility.
 * @property {WarehouseServices} services - Object representing services available in the warehouse.
 * @property {string[]} rules - Array of rules associated with the warehouse.
 */

/**
 * Represents the address of the warehouse.
 * @typedef {Object} WarehouseAddress
 * @property {string} streetNumber - The street number of the warehouse address.
 * @property {string} streetAddress - The street address of the warehouse.
 * @property {string} city - The city where the warehouse is located.
 * @property {string} state - The state where the warehouse is located.
 * @property {string} zipCode - The zip code of the warehouse address.
 * @property {string} country - The country where the warehouse is located.
 */

/**
 * Represents approved uses for the warehouse.
 * @typedef {Object} WarehouseApprovedUses
 * @property {boolean} apparel - Approved use for apparel.
 * @property {boolean} automotive - Approved use for automotive.
 * @property {boolean} baseMetals - Approved use for base metals.
 * @property {boolean} consumerProducts - Approved use for consumer products.
 * @property {boolean} electronics - Approved use for electronics.
 * @property {boolean} industrialMaterials - Approved use for industrial materials.
 * @property {boolean} machinery - Approved use for machinery.
 */

/**
 * Represents features available in the warehouse.
 * @typedef {Object} WarehouseFeatures
 * @property {boolean} highDoors - Availability of high doors.
 * @property {boolean} internet - Availability of internet.
 * @property {boolean} groundDoors - Availability of ground doors.
 * @property {boolean} waterDrain - Availability of water drain.
 * @property {boolean} ceilingHeight - Availability of ceiling height.
 * @property {boolean} securityCameras - Availability of security cameras.
 * @property {boolean} heightOfRollupDoor - Availability of height of the roll-up door.
 * @property {boolean} specialtyPower - Availability of specialty power.
 * @property {boolean} officeSpace - Availability of office space.
 * @property {boolean} overnightParking - Availability of overnight parking.
 * @property {boolean} forkLift - Availability of forklift.
 */

/**
 * Represents details about the warehouse facility.
 * @typedef {Object} WarehouseFacilityDetails
 * @property {number} totalSpace - The total space of the warehouse facility.
 * @property {WarehouseOperatingHours} operatingHours - Object representing operating hours of the warehouse.
 * @property {string} facilitySecurity - Description of facility security measures.
 * @property {string} industriesServed - Industries served by the warehouse.
 * @property {string} dockHighDoors - Number of dock high doors in the warehouse.
 * @property {string} atGradeDoors - Number of at-grade doors in the warehouse.
 * @property {string} storageLayout - Layout of storage in the warehouse.
 * @property {string} wmsVendor - Warehouse Management System vendor used in the warehouse.
 * @property {number} clearCeilingHeight - Clear ceiling height in the warehouse.
 * @property {number} maxForkliftCapacity - Maximum forklift capacity in the warehouse.
 */

/**
 * Represents operating hours of the warehouse.
 * @typedef {Object} WarehouseOperatingHours
 * @property {string} start - Start timestamp in milliseconds.
 * @property {string} end - End timestamp in milliseconds.
 */

/**
 * Represents services available in the warehouse.
 * @typedef {Object} WarehouseServices
 * @property {number} totalSpace - The total space allocated for services in the warehouse.
 * @property {WarehouseOperatingHours} operatingHours - Object representing operating hours of the services.
 * @property {string} facilitySecurity - Description of security measures for services.
 * @property {string} industriesServed - Industries served by the services.
 * @property {string} dockHighDoors - Number of dock high doors for services.
 * @property {string} atGradeDoors - Number of at-grade doors for services.
 * @property {string} storageLayout - Layout of storage for services.
 * @property {string} wmsVendor - Warehouse Management System vendor used for services.
 * @property {number} clearCeilingHeight - Clear ceiling height for services.
 * @property {number} maxForkliftCapacity - Maximum forklift capacity for services.
 * @property {number} addOnServiceRate - Rate for additional services.
 * @property {string} inboundServices - Inbound services provided.
 * @property {string} outboundServices - Outbound services provided.
 * @property {string} valueAddServices - Value-added services provided.
 * @property {number} serviceRate - Rate for the primary service.
 */

/**
 * Represents a photo associated with Warehouse.
 * @typedef {Object} Photo
 * @property {string} id - The unique identifier for the photo.
 * @property {string} title - The title of the photo.
 * @property {string} coverUrl - The URL of the photo's cover image.
 */
