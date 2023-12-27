import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { fCurrency } from 'src/utils/format-number';

import { Stack } from '@mui/material';
import Label from 'src/components/common/label';
import { getWarehouseAddress } from 'src/components/warehouse/utils';

// ----------------------------------------------------------------------

const TransactionTableRowProps = {
  /** @type {CustomerTransaction} */
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

/**
 * Transection Table Row UI
 * @param {TransactionTableRowProps} props
 * @returns
 */
const TransactionTableRow = (props) => {
  const { row, selected } = props;

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar
            alt={row.warehouse.name}
            src={row.warehouse.photos[0].coverUrl}
            sx={{ mr: 2 }}
            variant="rounded"
          />

          <ListItemText
            primary={row.warehouse.name}
            secondary={getWarehouseAddress(row.warehouse.address)}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar alt={row.seller.displayName} src={row.seller.photoURL} sx={{ mr: 2 }} />
          <ListItemText
            primary={row.seller.displayName}
            secondary={row.seller.email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </Stack>
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
            (row.status === 'completed' && 'success') ||
            (row.status === 'pending' && 'warning') ||
            (row.status === 'declined' && 'error') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
};

TransactionTableRow.propTypes = TransactionTableRowProps;

export default TransactionTableRow;
