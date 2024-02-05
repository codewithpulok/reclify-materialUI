import PropTypes from 'prop-types';
import { NewsEditView } from 'src/sections/private/dashboard/news';

const NewsEditPage = ({ params }) => {
  const { id } = params;
  return <NewsEditView id={id} />;
};

NewsEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default NewsEditPage;
