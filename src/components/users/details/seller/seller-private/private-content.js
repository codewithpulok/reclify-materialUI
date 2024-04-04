'use client';

import PropTypes from 'prop-types';
import { EmptyState } from 'src/components/common/custom-state';
import { TransactionsUserTable } from 'src/components/common/custom-table';
import useHash from 'src/hooks/use-hash';

import HomeSection from '../common/home-section';
import MembershipSection from '../common/membership-section';
import ServiceSection from '../common/service-section';
import WarehouseSection from '../common/warehouse-section';
import AdminControl from './admin-control';

/**
 * @param {PrivateContent.propTypes} props
 * @returns {JSX.Element}
 */
const PrivateContent = (props) => {
  const { user } = props;
  const hash = useHash();

  if (hash === '#profile' || !hash)
    return <HomeSection user={user} firstChildren={<AdminControl user={user} />} />;
  if (hash === '#services' || !hash) {
    if (user?.serviceType === 'warehouse') {
      return <WarehouseSection warehouses={user?.warehouses || []} />;
    }
    return <ServiceSection services={user?.service ? [user.service] : []} />;
  }
  if (hash === '#membership') return <MembershipSection user={user} />;
  if (hash === '#transactions') return <TransactionsUserTable data={user?.transactions} />;

  return <EmptyState />;
};

PrivateContent.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default PrivateContent;
