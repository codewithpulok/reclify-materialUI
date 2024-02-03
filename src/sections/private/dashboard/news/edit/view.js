'use client';

import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
// local component
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { useBlogGetQuery } from 'src/redux-toolkit/services/blogApi';
import EditContent from './content';

const Props = {
  id: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsEditView = (props) => {
  const { id } = props;
  const blogResponse = useBlogGetQuery(id);

  // if error occured
  if ((blogResponse.isError || blogResponse.data?.isError) && !blogResponse.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (blogResponse.data?.statusCode === 404) notFound();

  // on request success
  if (blogResponse.isSuccess && blogResponse.data?.success) {
    return <EditContent post={blogResponse.data?.results} />;
  }

  return <LoadingScreen />;
};

NewsEditView.propTypes = Props;

export default NewsEditView;
