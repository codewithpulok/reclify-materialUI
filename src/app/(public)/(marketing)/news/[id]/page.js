import PropTypes from 'prop-types';
import { NewsDetailsView } from 'src/sections/public/marketing/news';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'News Details - Racklify',
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
