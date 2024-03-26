import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { SellerDetailsView } from 'src/sections/public/dashboard/users';
import { getUser } from 'src/utils/api/server/services/users.api';

const SellerDetailsPage = async ({ params }) => {
  const seller = await getUser(params.id);

  if (seller?.isError) return notFound();

  if (seller?.success) return <SellerDetailsView user={seller?.results} />;

  return <Loading />;
};

SellerDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default SellerDetailsPage;
