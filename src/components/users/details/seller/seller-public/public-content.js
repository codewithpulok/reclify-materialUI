'use client';

import PropTypes from 'prop-types';
import { EmptyState } from 'src/components/common/custom-state';
import useHash from 'src/hooks/use-hash';
import HomeSection from '../common/home-section';
import ServiceSection from '../common/service-section';
import WarehouseSection from '../common/warehouse-section';

/**
 * @param {PublicContent.propTypes} props
 * @returns {JSX.Element}
 */
const PublicContent = (props) => {
  const { user } = props;
  console.log({ user });
  const hash = useHash();

  if (hash === '#profile' || !hash) return <HomeSection user={user} />;
  if (hash === '#services' || !hash) {
    if (user?.serviceType === 'warehouse') {
      return <WarehouseSection warehouses={user?.warehouses || []} />;
    }
    return <ServiceSection services={user?.service ? [user.service] : []} />;
  }

  return <EmptyState />;
};

PublicContent.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default PublicContent;
