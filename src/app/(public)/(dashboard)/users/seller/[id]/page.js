import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import { SplashScreen } from 'src/components/common/loading-screen';
import { SellerDetailsView } from 'src/sections/public/dashboard/users';
import { getUser } from 'src/utils/api/server/services/users.api';

export const dynamicParams = true;

/** @type {import('next').GetStaticPaths} */
export async function generateStaticParams() {
  return [];
}

const SellerDetailsPage = async ({ params }) => {
  const seller = await getUser(params.id);

  if (seller?.isError) return notFound();

  if (seller?.success) return <SellerDetailsView id={params.id} data={seller?.results} />;

  return <SplashScreen />;
};

SellerDetailsPage.propTypes = {
  params: {
    id: PropTypes.string,
  },
};

export default SellerDetailsPage;
