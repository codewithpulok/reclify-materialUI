'use client';

import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import { SellerPrivateDetails } from 'src/components/users/details';
import { useGetUserQuery } from 'src/redux-toolkit/services/adminApi';

const Props = {
  id: PropTypes.string.isRequired,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SellerDetailsView = (props) => {
  const { id } = props;
  const userResponse = useGetUserQuery(id, { skip: !id });

  // if error occured
  if ((userResponse.isError || userResponse.data?.isError) && !userResponse.isLoading)
    return <ErrorState />;

  // if there is no warehouse then show error
  if (userResponse.data?.statusCode === 404) notFound();

  // on request success
  if (userResponse.isSuccess && userResponse.data?.success) {
    return <SellerPrivateDetails user={userResponse.data.results} />;
  }

  return <LoadingScreen />;
};

SellerDetailsView.propTypes = Props;

export default SellerDetailsView;
