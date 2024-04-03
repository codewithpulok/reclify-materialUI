import InitAuth from 'src/redux-toolkit/features/auth/init-auth';
import HomeView from 'src/sections/public/pages/home/view';
import { getPlans } from 'src/utils/api/server/services/plans.api';
// ----------------------------------------------------------------------

/** @type {import('next').Metadata} */
export const metadata = {
  title: {
    absolute: 'Racklify',
  },
  description: 'Your Online Logistics Hub',
};

export default async function HomePage() {
  const plans = await getPlans();

  return (
    <InitAuth>
      <HomeView plans={plans?.results || []} />
    </InitAuth>
  );
}
