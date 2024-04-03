import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { CustomerDetailsView } from 'src/sections/public/dashboard/users';
import { getUser } from 'src/utils/api/server/services/users.api';

const CustomerDetailsPage = async ({ params }) => {
  const response = await getUser(params.id);

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success) return <CustomerDetailsView user={response.results} />;

  return <Loading />;
};

CustomerDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default CustomerDetailsPage;
