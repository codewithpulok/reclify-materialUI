'use client';

import PropTypes from 'prop-types';
import DetailsContent from './details-content';

const Props = {
  // id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SellerDetailsView = (props) => {
  const { data } = props;
  // const userResponse = useGetUserQuery(id, { skip: !id });

  // // if error occured
  // if ((userResponse.isError || userResponse.data?.isError) && !userResponse.isLoading)
  //   return <ErrorState />;

  // // if there is no warehouse then show error
  // if (userResponse.data?.statusCode === 404) notFound();

  // // on request success
  // if (userResponse.isSuccess && userResponse.data?.success) {
  //   return <DetailsContent user={data} />;
  // }

  return <DetailsContent user={data} />;
};

SellerDetailsView.propTypes = Props;

export default SellerDetailsView;
