import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { fCurrency } from 'src/utils/format-number';

import { IconButton, MenuItem, Stack } from '@mui/material';
import { usePopover } from 'src/components/common/custom-popover';
import CustomPopover from 'src/components/common/custom-popover/custom-popover';
import Label from 'src/components/common/label';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

const TransactionTableRowProps = {
  /** @type {CustomerTransaction} */
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onViewTransaction: PropTypes.func.isRequired,
  onCancelOrder: PropTypes.func.isRequired,
};

/**
 * Transection Table Row UI
 * @param {TransactionTableRowProps} props
 * @returns
 */
const TransactionTableRow = (props) => {
  const { row, selected, onCancelOrder, onViewTransaction } = props;
  const popover = usePopover(false);

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>
        <IconButton onClick={onViewTransaction} color="default">
          {ICONS.eye()}
        </IconButton>
      </TableCell>
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
              color: 'text.disabled',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          />
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar alt={row.seller.displayName} src={row.seller.photoURL} sx={{ mr: 2 }} />
          <ListItemText
            primary={row.seller.displayName}
            primaryTypographyProps={{ typography: 'body2' }}
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
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={popover.open ? 'inherit' : 'default'}
          onClick={popover.onOpen}
          disabled={row.status !== 'pending'}
        >
          {ICONS.more()}
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 300 }}
      >
        {row.status === 'pending' && (
          <MenuItem
            onClick={() => {
              onCancelOrder();
              popover.onClose();
            }}
          >
            Cancel Order
          </MenuItem>
        )}
      </CustomPopover>
    </>
  );
};

TransactionTableRow.propTypes = TransactionTableRowProps;

export default TransactionTableRow;
