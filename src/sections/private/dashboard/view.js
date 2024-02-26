'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from 'src/app/loading';
import { paths } from 'src/routes/paths';

const DashboardView = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(paths.dashboard.warehouses.root);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading />;
};

DashboardView.propTypes = {};

export default DashboardView;
