import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';
import Loading from '../loading';

const DashboardPage = () => {
  redirect(paths.dashboard.warehouses.root, 'replace');

  return <Loading />;
};

export default DashboardPage;
