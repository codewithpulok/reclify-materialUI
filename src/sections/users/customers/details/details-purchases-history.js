import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

const Props = {
  /** @type {Transaction[]} */
  transactions: PropTypes.arrayOf(PropTypes.object),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsPurchaseHistory = (props) => {
  const { transactions = [] } = props;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Warehouse Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                {row.warehouse.name}
              </TableCell>
              <TableCell align="right">{fCurrency(row.pricePerSquare * row.area)}</TableCell>
              <TableCell align="right">{fDate(row.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DetailsPurchaseHistory.propTypes = Props;

export default DetailsPurchaseHistory;
