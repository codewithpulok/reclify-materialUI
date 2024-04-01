import { notFound } from 'next/navigation';
import Loading from 'src/app/loading';
import { WarehouseUSListingView } from 'src/sections/public/dashboard/warehouses';
import { getWarehouses } from 'src/utils/api/server/services/warehouse.api';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'US Warehouses',
  keywords: [
    'United States warehouses',
    'US warehouse rental',
    'Warehouse facilities in the USA',
    'American warehouse listings',
    'US industrial spaces',
    'Warehouse leasing in America',
    'US warehouse inventory',
    'Warehouse properties in the United States',
    'USA storage solutions',
    'US logistics centers',
    'Distribution centers in the USA',
    'US supply chain solutions',
    'Commercial storage in America',
    'Fulfillment services in the USA',
    'US third-party logistics (3PL)',
    'Warehouse technology in the United States',
    'E-commerce fulfillment in America',
    'Industrial real estate in the USA',
    'Warehouse management in the United States',
    'Inventory management in America',
  ],
};

const WarehousesUSListingPage = async () => {
  const response = await getWarehouses({ regionScope: 'us' });

  if (response.isError) return notFound();

  if (response.success) return <WarehouseUSListingView warehouses={response.results} />;

  return <Loading />;
};

export default WarehousesUSListingPage;
