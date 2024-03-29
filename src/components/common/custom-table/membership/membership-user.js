'use client';

import PropTypes from 'prop-types';
import MembershipTable from './common/membership-table';
// ----------------------------------------------------------------------

/** @type {{id: import('react-hook-form/dist/types/path/common').Keys<Membership>, label: string}[]} */
const TABLE_HEAD = [
  { id: 'planId', label: 'Plan Name' },
  { id: 'invoiceData.price', label: 'Subscription Price' },
  { id: 'invoiceData.type', label: 'Type' },
  { id: 'invoiceData.file', label: 'Invoice' },
  { id: 'createdAt', label: 'Date' },
];

const Props = {
  data: PropTypes.arrayOf(PropTypes.object),
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const MembershipUser = (props) => {
  const { data } = props;

  return (
    <MembershipTable
      data={data}
      tableHead={TABLE_HEAD}
      isError={false}
      isLoading={!Array.isArray(data)}
      isSuccess={!!data}
    />
  );
};

// ----------------------------------------------------------------------

MembershipUser.propTypes = Props;

export default MembershipUser;
