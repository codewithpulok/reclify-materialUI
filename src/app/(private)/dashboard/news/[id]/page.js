import PropTypes from 'prop-types';
import { NewsPreviewView } from 'src/sections/private/dashboard/news';

const NewsPreviewPage = ({ params }) => {
  const { id } = params;
  return <NewsPreviewView id={id} />;
};

NewsPreviewPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default NewsPreviewPage;
