import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { CustomerDetailsView } from 'src/sections/public/dashboard/users';
import { getUser } from 'src/utils/api/server/services/users.api';

const CustomerDetailsPage = async ({ params }) => {
  const customer = await getUser(params.id);

  if (customer.isError) return notFound();

  if (customer.success) return <CustomerDetailsView user={customer.results} />;

  return <Loading />;
};

CustomerDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default CustomerDetailsPage;
