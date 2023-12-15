import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

const TransactionTableRowProps = {
  /** @type {Transection} */
  row: PropTypes.object,
  selected: PropTypes.bool,
};

/**
 * Transection Table Row UI
 * @param {TransactionTableRowProps} props
 * @returns
 */
export default function TransactionTableRow(props) {
  const { row, selected } = props;

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row.customer.name} src={row.customer.photoURL} sx={{ mr: 2 }} />

        <ListItemText
          primary={row.customer.name}
          secondary={row.customer.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={format(new Date(row.createdAt), 'dd MMM yyyy')}
          secondary={format(new Date(row.createdAt), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell> {fCurrency(row.price)} </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'COMPLETED' && 'success') ||
            (row.status === 'PENDING' && 'warning') ||
            (row.status === 'CANCELED' && 'error') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}

TransactionTableRow.propTypes = TransactionTableRowProps;
