import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { SellerDetailsView } from 'src/sections/public/dashboard/users';
import { getUser } from 'src/utils/api/server/services/users.api';

const SellerDetailsPage = async ({ params }) => {
  const response = await getUser(params.id);

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response?.success) return <SellerDetailsView user={response?.results} />;

  return <Loading />;
};

SellerDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default SellerDetailsPage;
