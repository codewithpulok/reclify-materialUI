import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { PLACEHOLDER_NEWS_COVER } from 'src/config-global';
import { NewsDetailsView } from 'src/sections/public/pages/news';
import { getPost } from 'src/utils/api/server/services/posts.api';
import { fDate, fTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

/**
 * @param {WarehouseDetailsPage.propTypes} props
 * @returns {import('next').Metadata}
 */
export const generateMetadata = async ({ params }) => {
  const response = await getPost(params.id);

  if (response.success) {
    return {
      title: response?.results?.title,
      description: response?.results?.description,
      openGraph: {
        type: 'article',
        title: response?.results?.title,
        description: response?.results?.description,
        images: response?.results?.coverUrl || PLACEHOLDER_NEWS_COVER,
        releaseDate: fDate(response?.results?.createdAt),
        publishedTime: fTime(response?.results?.createdAt),
      },
    };
  }

  return {};
};

/**
 * @param {NewsDetailsPage.propTypes} props
 * @returns {JSX.Element}
 */
const NewsDetailsPage = async (props) => {
  const { params } = props;

  const response = await getPost(params.id);

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success) return <NewsDetailsView post={response.results} />;

  return <Loading />;
};

NewsDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default NewsDetailsPage;
