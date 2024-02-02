import PropTypes from 'prop-types';
import { NewsEditView } from 'src/sections/private/dashboard/news';

const NewsEditPage = ({ params }) => {
  const { id: slug } = params;
  return <NewsEditView title={slug} />;
};

NewsEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default NewsEditPage;
