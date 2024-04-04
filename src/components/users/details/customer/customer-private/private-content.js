'use client';

import PropTypes from 'prop-types';
import { EmptyState } from 'src/components/common/custom-state';
import { TransactionsUserTable } from 'src/components/common/custom-table';
import useHash from 'src/hooks/use-hash';
import HomeSection from '../common/home-section';

/**
 * @param {PrivateContent.propTypes} props
 * @returns {JSX.Element}
 */
const PrivateContent = (props) => {
  const { user } = props;
  const hash = useHash();

  if (hash === '#transactions') return <TransactionsUserTable data={user.transactions} />;

  if (hash === '#profile' || !hash) return <HomeSection user={user} />;

  return <EmptyState />;
};

PrivateContent.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default PrivateContent;
