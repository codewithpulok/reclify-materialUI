import { notFound } from 'next/navigation';
import Loading from 'src/app/loading';
import { WarehousesListingView } from 'src/sections/public/dashboard/warehouses';
import { getWarehouses } from 'src/utils/api/server/services/warehouse.api';

export const metadata = {
  title: 'Warehouses Listing',
  keywords: [
    'Warehouse listings',
    'Warehouse rental options',
    'Warehouse spaces for rent',
    'Warehouse inventory',
    'Available warehouses',
    'Warehouse rental listings',
    'Industrial space listings',
    'Commercial warehouse listings',
    'Warehouse properties',
    'Warehouse rentals near me',
    'Warehouse availability',
    'Find warehouse space',
    'Warehouse leasing options',
    'Warehouse rental marketplace',
    'Warehouse vacancies',
    'Industrial real estate listings',
    'Warehouse facilities',
    'Warehouse rentals directory',
    'Warehouse rental search',
    'Warehousing options',
  ],
};

const WarehousesListingPage = async (props) => {
  const response = await getWarehouses();

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success) return <WarehousesListingView data={response?.results || []} />;

  return <Loading />;
};

WarehousesListingPage.propTypes = {};

export default WarehousesListingPage;
