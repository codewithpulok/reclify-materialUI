import { WarehousesDetailsView } from 'src/sections/private/dashboard/warehouses';

export default async function WarehouseDetailsPage({ params }) {
  return <WarehousesDetailsView id={params.id} />;
}
