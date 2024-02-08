'use client';

import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
// local component
import { ErrorState } from 'src/components/common/custom-state';
import NewsDetailsPreview from 'src/components/news/details/details-preview';
import NewsDetailsSkeleton from 'src/components/news/details/details-skeleton';
import { useBlogGetQuery } from 'src/redux-toolkit/services/blogApi';

const Props = {
  id: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsPreviewView = (props) => {
  const { id } = props;
  const blogResponse = useBlogGetQuery(id);

  // if error occured
  if ((blogResponse.isError || blogResponse.data?.isError) && !blogResponse.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (blogResponse.data?.statusCode === 404) notFound();

  // on request success
  if (blogResponse.isSuccess && blogResponse.data?.success) {
    return <NewsDetailsPreview post={blogResponse.data?.results} />;
  }

  return <NewsDetailsSkeleton />;
};

NewsPreviewView.propTypes = Props;

export default NewsPreviewView;
