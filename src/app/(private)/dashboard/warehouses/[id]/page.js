import { WarehousesDetailsView } from 'src/sections/warehouses';

export default async function WarehouseDetailsPage({ params }) {
  return <WarehousesDetailsView id={params.id} />;
}
