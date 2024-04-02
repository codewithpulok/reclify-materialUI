import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { WarehousesDetailsView } from 'src/sections/public/dashboard/warehouses';
import { joinAddressObj } from 'src/utils/address';
import { getWarehouse } from 'src/utils/api/server/services/warehouse.api';

/**
 * @param {WarehouseDetailsPage.propTypes} props
 * @returns {import('next').Metadata}
 */
export const generateMetadata = async ({ params }) => {
  const response = await getWarehouse(params.id);

  if (response.success) {
    return {
      title: response?.results?.name,
      description: response?.results?.description,
      other: {
        'geo.region': response?.results?.region,
        'geo.placename': joinAddressObj(response?.results?.address),
      },
    };
  }

  return {};
};

/**
 * @param {WarehouseDetailsPage.propTypes} props
 * @returns {JSX.Element}
 */
const WarehouseDetailsPage = async ({ params }) => {
  const response = await getWarehouse(params.id);

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success) return <WarehousesDetailsView warehouse={response.results} />;

  return <Loading />;
};

WarehouseDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default WarehouseDetailsPage;
