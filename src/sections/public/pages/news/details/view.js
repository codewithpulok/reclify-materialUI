'use client';

import PropTypes from 'prop-types';
// local component
import NewsDetails from 'src/components/news/details';

/**
 * @param {NewsDetailsView.propTypes} props
 * @returns {JSX.Element}
 */
const NewsDetailsView = (props) => {
  const { post } = props;

  return <NewsDetails post={post} />;
};

NewsDetailsView.propTypes = {
  /** @type {NewsType} */
  post: PropTypes.object.isRequired,
};

export default NewsDetailsView;
