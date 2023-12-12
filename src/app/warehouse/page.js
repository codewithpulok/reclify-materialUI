import { warehouses } from 'src/assets/dummy/warehouses';
import Warehouse from 'src/sections/warehouse/view';

export const metadata = {
  title: 'warehouse: Details',
};

export default function Page() {
  // const theme = useTheme();
  return <Warehouse warehouse={warehouses[0]} />;
}
