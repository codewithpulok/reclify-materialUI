import { notFound } from 'next/navigation';
import { findCustomer } from 'src/assets/dummy/users';
import { CustomerDetailsView } from 'src/sections/users';

export const generateMetadata = async ({ params }) => {
  const user = await findCustomer(params.id);

  if (!user) return {};

  return {
    title: `${user?.displayName} - Customer Details`,
  };
};

const CustomerDetailsPage = async ({ params }) => {
  const user = await findCustomer(params.id);

  // if there is no user then show error
  if (user === undefined) notFound();

  return <CustomerDetailsView user={user} />;
};

export default CustomerDetailsPage;
