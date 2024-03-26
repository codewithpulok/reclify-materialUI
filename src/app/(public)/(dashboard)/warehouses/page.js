import { notFound } from 'next/navigation';
import Loading from 'src/app/loading';
import { WarehousesListingView } from 'src/sections/public/dashboard/warehouses';
import { getAllWarehouses } from 'src/utils/api/server/services/warehouse.api';

const WarehousesListingPage = async (props) => {
  const warehouses = await getAllWarehouses();

  if (warehouses.isError) notFound();

  if (warehouses.success) return <WarehousesListingView data={warehouses?.results || []} />;

  return <Loading />;
};

WarehousesListingPage.propTypes = {};

export default WarehousesListingPage;
