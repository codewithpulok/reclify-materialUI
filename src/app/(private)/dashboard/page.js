import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

const DashboardPage = () => redirect(paths.dashboard.warehouses.root, 'replace');
export default DashboardPage;
