import PropTypes from 'prop-types';
import { NewsDetailsView } from 'src/sections/public/pages/news';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'News Details',
};

const NewsDetailsPage = ({ params }) => {
  const { id } = params;
  return <NewsDetailsView id={id} />;
};

NewsDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};
export default NewsDetailsPage;
