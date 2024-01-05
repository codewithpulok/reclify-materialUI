import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

const DetailsMembershipHistoryProps = {
  /** @type {Membership[]} */
  membershipHistory: PropTypes.arrayOf(PropTypes.object),
};

/**
 * @param {DetailsMembershipHistoryProps} props
 * @returns {JSX.Element}
 */
const DetailsMembershipHistory = (props) => {
  const { membershipHistory = [] } = props;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plan Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {membershipHistory.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                {row.plan?.subscription}
              </TableCell>
              <TableCell align="right">{fCurrency(row.plan?.price)}</TableCell>
              <TableCell align="right">{fDate(row.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DetailsMembershipHistory.propTypes = DetailsMembershipHistoryProps;

export default DetailsMembershipHistory;
