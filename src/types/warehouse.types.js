/**
 * Represents information about Warehouse Info. (Need update, 2024/02/07)
 * @typedef {Object} Warehouse
 * @property {string} id - The unique identifier for warehouse.
 * @property {string} name - The name of the warehouse, in this case, 'Ware House'.
 * @property {'northeast' | 'southwest' | 'northwest' | 'southeast' |'midwest'} region - The region of the warehouse
 * @property {Address} address - The address of the warehouse
 * @property {string} description - The description of the warehouse, e.g., 'Modern storage facility in the heart of the city.'.
 * @property {number} totalSpace - The total space of the warehouse in pallet, e.g., 5000.
 * @property {number} price1 - price for one month
 * @property {number} price3 - price for three month
 * @property {number} price6 - price for six month
 * @property {number} price12 - price for twelve month
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
 * @property {boolean} visible - indicate that warehouse visible or not. (only admin can change it)
 * @property {number} averageRating
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
 * @typedef {Object} WarehouseFeatures (Need update 2024/2/7)
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
 * @property {number} yearFounded - Year Founded.
 * @property {number} squareFootage - Square Footage.
 * @property {string} employees - # of Employees.
 * @property {WarehouseOperatingHours} operatingHours - Object representing operating hours of the warehouse.
 * @property {string} orderAccuracyRate - Order Accuracy Rate.
 * @property {string} buildingSecurity - Building Security.
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
 * @property {string} link - The URL of the photo's image.
 * @property {boolean} primary
 */
