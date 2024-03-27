import InitAuth from 'src/redux-toolkit/features/auth/init-auth';
import HomeView from 'src/sections/public/pages/home/view';
import { getAllPlans } from 'src/utils/api/server/services/plans.api';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Racklify',
  description: 'Your Online Logistics Hub',
};

export default async function HomePage() {
  const plans = await getAllPlans();

  return (
    <InitAuth>
      <HomeView plans={plans?.results || []} />
    </InitAuth>
  );
}
