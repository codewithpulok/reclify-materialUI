import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import { RouterLink } from 'src/routes/components';
// local components
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';
import { ICONS } from '../../../config-users';

const Props = {
  /** @type {Membership[]} */
  membershipHistory: PropTypes.arrayOf(PropTypes.object),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const MembershipHistory = (props) => {
  const { membershipHistory = [] } = props;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plan Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Invoice</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {membershipHistory.map((row) => (
            <TableRow
              key={row?.createdAt}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                {row?.planId}
              </TableCell>
              <TableCell align="right">{fCurrency(row?.invoiceData?.price) || '$0.00'}</TableCell>
              <TableCell align="right">
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
              <TableCell align="right">{fDate(row?.createdAt) || 'Date not available'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

MembershipHistory.propTypes = Props;

export default MembershipHistory;
