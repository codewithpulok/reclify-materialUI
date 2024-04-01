import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { WarehousesDetailsView } from 'src/sections/public/dashboard/warehouses';
import { getWarehouse } from 'src/utils/api/server/services/warehouse.api';

export const generateMetadata = async ({ params }) => {
  const response = await getWarehouse(params.id);

  if (response.success) {
    return {
      title: response?.results?.name,
      description: response?.results?.description,
    };
  }

  return {};
};

const WarehouseDetailsPage = async ({ params }) => {
  const response = await getWarehouse(params.id);

  if (response.isError) return notFound();

  if (response.success) return <WarehousesDetailsView warehouse={response.results} />;

  return <Loading />;
};

WarehouseDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default WarehouseDetailsPage;
