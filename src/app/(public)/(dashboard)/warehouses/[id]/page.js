import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { WarehousesDetailsView } from 'src/sections/public/dashboard/warehouses';
import { joinAddressObj } from 'src/utils/address';
import { getWarehouse } from 'src/utils/api/server/services/warehouse.api';
import { fDate, fTime } from 'src/utils/format-time';
import { getPrimaryPhoto } from 'src/utils/photos';

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
      openGraph: {
        type: 'article',
        title: response?.results?.name,
        description: response?.results?.description,
        images: getPrimaryPhoto(response?.results?.photos),
        releaseDate: fDate(response?.results?.createdAt),
        publishedTime: fTime(response?.results?.createdAt),
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
