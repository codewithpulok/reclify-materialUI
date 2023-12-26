import { notFound } from 'next/navigation';
import { findWarehouseUser } from 'src/assets/dummy/users';
import { WarehouseUsersDetailsView } from 'src/sections/warehouse-users';

export const generateMetadata = async ({ params }) => {
  const user = await findWarehouseUser(params.id);

  if (!user) return {};

  return {
    title: `${user.displayName} - Warehouse User Details`,
  };
};

const WarehouseUsersDetailsPage = async ({ params }) => {
  const user = await findWarehouseUser(params.id);

  // if there is no user then show error
  if (user === undefined) notFound();

  return <WarehouseUsersDetailsView user={user} />;
};

export default WarehouseUsersDetailsPage;
