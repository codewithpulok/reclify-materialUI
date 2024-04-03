import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/public/dashboard/warehouses';
import { getWarehouses } from 'src/utils/api/server/services/warehouse.api';

const keywords = {
  northeast: [
    'Northeast warehouses',
    'Northeastern warehouse facilities',
    'Warehouse rentals in the Northeast',
    'Northeast industrial spaces',
    'Northeast distribution centers',
    'Northeast storage solutions',
    'Northeast logistics centers',
    'Northeast commercial storage',
    'Northeast fulfillment services',
    'Northeast third-party logistics (3PL)',
    'Northeast warehouse technology',
    'Northeast e-commerce fulfillment',
    'Northeast industrial real estate',
    'Northeast warehouse management',
    'Northeast inventory management',
    'Warehouse leasing in the Northeast',
    'Northeast warehouse listings',
    'Northeast warehouse properties',
    'Warehouse availability in the Northeast',
    'Warehouse rentals in [specific Northeast state or city]',
  ],
  midwest: [
    'Midwest warehouses',
    'Midwestern warehouse facilities',
    'Warehouse rentals in the Midwest',
    'Midwest industrial spaces',
    'Midwest distribution centers',
    'Midwest storage solutions',
    'Midwest logistics centers',
    'Midwest commercial storage',
    'Midwest fulfillment services',
    'Midwest third-party logistics (3PL)',
    'Midwest warehouse technology',
    'Midwest e-commerce fulfillment',
    'Midwest industrial real estate',
    'Midwest warehouse management',
    'Midwest inventory management',
    'Warehouse leasing in the Midwest',
    'Midwest warehouse listings',
    'Midwest warehouse properties',
    'Warehouse availability in the Midwest',
    'Warehouse rentals in [specific Midwest state or city]',
  ],
  West: [
    'West region warehouses',
    'Western warehouse facilities',
    'Warehouse rentals in the West',
    'Western industrial spaces',
    'West coast distribution centers',
    'West region storage solutions',
    'Western logistics centers',
    'Commercial storage in the West',
    'West region fulfillment services',
    'Third-party logistics (3PL) in the West',
    'Warehouse technology in the West',
    'E-commerce fulfillment in the West',
    'Industrial real estate in the West',
    'West region warehouse management',
    'Inventory management in the West',
    'Warehouse leasing in the West',
    'West region warehouse listings',
    'Warehouse properties in the West',
    'Warehouse availability in the West',
    'Warehouse rentals in [specific West region state or city]',
  ],
  south: [
    'South region warehouses',
    'Southern warehouse facilities',
    'Warehouse rentals in the South',
    'Southern industrial spaces',
    'South region distribution centers',
    'Storage solutions in the South',
    'Southern logistics centers',
    'Commercial storage in the South',
    'Fulfillment services in the South',
    'Third-party logistics (3PL) in the South',
    'Warehouse technology in the South',
    'E-commerce fulfillment in the South',
    'Industrial real estate in the South',
    'South region warehouse management',
    'Inventory management in the South',
    'Warehouse leasing in the South',
    'South region warehouse listings',
    'Warehouse properties in the South',
    'Warehouse availability in the South',
    'Warehouse rentals in [specific South region state or city]',
  ],
  'alaska-hawai': [
    'Alaska warehouses',
    'Alaskan warehouse facilities',
    'Warehouse rentals in Alaska',
    'Hawaii warehouses',
    'Hawaiian warehouse facilities',
    'Warehouse rentals in Hawaii',
    'US Territories warehouses',
    'Warehouse facilities in US Territories',
    'Warehouse rentals in US Territories',
    'Alaska industrial spaces',
    'Hawaii industrial spaces',
    'US Territories industrial spaces',
    'Distribution centers in Alaska',
    'Distribution centers in Hawaii',
    'Distribution centers in US Territories',
    'Storage solutions in Alaska',
    'Storage solutions in Hawaii',
    'Storage solutions in US Territories',
    'Logistics centers in Alaska',
    'Logistics centers in Hawaii',
    'Logistics centers in US Territories',
  ],
};

export const generateMetadata = ({ params }) => {
  const region = getRegionByCode(params?.id);

  if (!region) {
    return {
      title: `${region.name} Warehouses`,
      keywords: keywords[region.code],
    };
  }

  return {};
};

const WarehouseRegionPage = async ({ params }) => {
  const region = getRegionByCode(params?.id);

  const response = await getWarehouses({ region: region.code });

  if (region === undefined || response.statusCode === 404) notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success)
    return <WarehousesRegionView region={region} warehouses={response.results} />;

  return <Loading />;
};

WarehouseRegionPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default WarehouseRegionPage;
