import { warehouses } from 'src/assets/dummy/warehouses';
import { WarehouseDetails } from 'src/sections/warehouse/';

export const metadata = {
  title: 'warehouse: Details',
};

export default function Page() {
  // const theme = useTheme();
  return <WarehouseDetails warehouse={warehouses[0]} />;
}
