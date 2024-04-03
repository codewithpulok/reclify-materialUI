import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { ServicesDetailsView } from 'src/sections/public/dashboard/services';
import { joinAddressObj } from 'src/utils/address';
import { getService } from 'src/utils/api/server/services/service.api';
import { fDate, fTime } from 'src/utils/format-time';
import { getPrimaryPhoto } from 'src/utils/photos';

/**
 *
 * @param {ServicesDetailsPage.propTypes} param0
 * @returns {import('next').Metadata}
 */
export const generateMetadata = async ({ params }) => {
  const response = await getService(params.id);

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
 * @param {ServicesDetailsPage.propTypes} props
 * @returns {JSX.Element}
 */
const ServicesDetailsPage = async ({ params }) => {
  const response = await getService(params.id);

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success) return <ServicesDetailsView service={response.results} />;

  return <Loading />;
};

ServicesDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default ServicesDetailsPage;
