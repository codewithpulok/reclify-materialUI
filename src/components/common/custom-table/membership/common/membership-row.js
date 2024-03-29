import PropTypes from 'prop-types';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Chip, Tooltip } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';
import { ICONS } from '../../icons';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Membership} */
  row: PropTypes.object.isRequired,
  /** @type {import('react-hook-form/dist/types/path/common').Keys<Membership>[]} */
  show: PropTypes.array,
};

/**
 * @param {Props} props
 * @returns
 */
const MembershipRow = (props) => {
  const { row, show = [] } = props;

  const renderPrimary = (
    <TableRow hover>
      {show.includes('planId') && (
        <TableCell scope="row" sx={{ textTransform: 'capitalize' }}>
          {row?.planId}
        </TableCell>
      )}

      {show.includes('invoiceData.price') && (
        <TableCell>{fCurrency(row?.invoiceData?.price) || '$0.00'}</TableCell>
      )}

      {show.includes('invoiceData.type') && (
        <TableCell>{row?.invoiceData?.annualPlan ? 'Annual' : 'Monthly'}</TableCell>
      )}

      {show.includes('invoiceData.file') && (
        <TableCell>
          <Tooltip title="Click to visit invoice PDF" arrow>
            <Chip
              label={row?.invoiceData?.invoiceNumber || 'INVOICE'}
              icon={ICONS.invoice()}
              clickable
              variant="outlined"
              component={RouterLink}
              href={row?.invoiceData?.file || '#'}
            />
          </Tooltip>
        </TableCell>
      )}

      {show.includes('createdAt') && (
        <TableCell>{fDate(row?.createdAt) || 'Date not available'}</TableCell>
      )}
    </TableRow>
  );

  return <>{renderPrimary}</>;
};

MembershipRow.propTypes = Props;

export default MembershipRow;
