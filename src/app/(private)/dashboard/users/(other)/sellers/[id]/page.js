import { notFound } from 'next/navigation';
import { findSeller } from 'src/assets/dummy/users';
import { SellerDetailsView } from 'src/sections/users';

export const generateMetadata = async ({ params }) => {
  const user = await findSeller(params.id);

  if (!user) return {};

  return {
    title: `${user?.displayName} - Seller Details`,
  };
};

const SellerDetailsPage = async ({ params }) => {
  const user = await findSeller(params.id);

  // if there is no user then show error
  if (user === undefined) notFound();

  return <SellerDetailsView user={user} />;
};

export default SellerDetailsPage;
