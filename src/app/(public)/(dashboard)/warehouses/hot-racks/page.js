import { notFound } from 'next/navigation';
import Loading from 'src/app/loading';
import { WarehousesHotDealsView } from 'src/sections/public/dashboard/warehouses';
import { getWarehouses } from 'src/utils/api/server/services/warehouse.api';

export const metadata = {
  title: 'HotRacks Warehouses',
  keywords: [
    'Discounted warehouses',
    'Warehouse discounts',
    'Warehouse deals',
    'Warehouse specials',
    'Discount warehouse space',
    'Warehouse rental discounts',
    'Discounted storage solutions',
    'Warehouse leasing deals',
    'Warehouse clearance',
    'Discounted industrial space',
    'Warehouse rental promotions',
    'Warehouse rental bargains',
    'Warehouse rental offers',
    'Discounted distribution centers',
    'Warehouse rental sales',
    'Warehouse rental markdowns',
    'Warehouse rental savings',
    'Discounted commercial storage',
    'Warehouse rental coupons',
    'Warehouse rental discounts in [location]',
  ],
};

const HotDealsPage = async () => {
  const response = await getWarehouses({ hasDiscount: true });

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success) return <WarehousesHotDealsView warehouses={response.results} />;

  return <Loading />;
};

export default HotDealsPage;
