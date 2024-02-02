import { WarehousesDetailsView } from 'src/sections/public/products/warehouses';

export default async function WarehouseDetailsPage({ params }) {
  return <WarehousesDetailsView id={params.id} />;
}
