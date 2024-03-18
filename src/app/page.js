import HomeView from 'src/sections/public/pages/home/view';
import { getAllPlans } from 'src/utils/api/server/services/plans.api';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Racklify',
};

export default async function HomePage() {
  const plans = await getAllPlans();

  return <HomeView plans={plans?.results || []} />;
}
