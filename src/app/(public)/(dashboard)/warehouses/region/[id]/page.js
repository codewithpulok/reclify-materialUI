import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { getRegionByCode } from 'src/assets/data';
import { WarehousesRegionView } from 'src/sections/public/dashboard/warehouses';
import { getWarehouses } from 'src/utils/api/server/services/warehouse.api';

export const generateMetadata = ({ params }) => {
  const region = getRegionByCode(params?.id);

  if (!region) {
    return {
      title: `${region.name} Warehouses`,
    };
  }

  return {};
};

const WarehouseMidwestPage = async ({ params }) => {
  const region = getRegionByCode(params?.id);

  const response = await getWarehouses({ region: region.code });

  if (region === undefined || response.isError) notFound();

  if (response.success)
    return <WarehousesRegionView region={region} warehouses={response.results} />;

  return <Loading />;
};

WarehouseMidwestPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default WarehouseMidwestPage;
