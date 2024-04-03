import { notFound } from 'next/navigation';
import Loading from 'src/app/loading';
import { WarehouseGlobalListingView } from 'src/sections/public/dashboard/warehouses';
import { getWarehouses } from 'src/utils/api/server/services/warehouse.api';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Global Warehouses',
  keywords: [
    'Global warehouses',
    'Worldwide warehouse solutions',
    'International warehouse facilities',
    'Global warehouse network',
    'Global distribution centers',
    'Global logistics hubs',
    'Global storage solutions',
    'International warehouse rentals',
    'Global warehouse leasing',
    'Worldwide warehouse inventory',
    'Global industrial spaces',
    'Global supply chain solutions',
    'Global commercial storage',
    'Global fulfillment services',
    'Global third-party logistics (3PL)',
    'Global warehouse technology',
    'Global e-commerce fulfillment',
    'Global industrial real estate',
    'Global warehouse management',
    'Global inventory management',
  ],
};

const WarehousesGlobalListingPage = async () => {
  const response = await getWarehouses({ regionScope: 'global' });

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success) return <WarehouseGlobalListingView warehouses={response.results} />;

  return <Loading />;
};

export default WarehousesGlobalListingPage;
