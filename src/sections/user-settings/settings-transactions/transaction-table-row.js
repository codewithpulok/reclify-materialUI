import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { fCurrency } from 'src/utils/format-number';

import { IconButton, MenuItem } from '@mui/material';
import { TRANSACTION_STATUS_OPTIONS } from 'src/assets/dummy/transactions';
import { usePopover } from 'src/components/common/custom-popover';
import CustomPopover from 'src/components/common/custom-popover/custom-popover';
import Label from 'src/components/common/label';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

const TransactionTableRowProps = {
  /** @type {Transaction} */
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  /** @type {(id: string, newStatus: TransactionStatus) => {}} */
  onStatusChange: PropTypes.func.isRequired,
};

/**
 * Transection Table Row UI
 * @param {TransactionTableRowProps} props
 * @returns
 */
const TransactionTableRow = (props) => {
  const { row, selected, onStatusChange } = props;
  const popover = usePopover(false);

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

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
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
        {TRANSACTION_STATUS_OPTIONS.map((statusOption) => {
          // exclude current status
          if (statusOption.value === row.status) return null;

          let color;
          switch (statusOption.value) {
            case 'COMPLETED': {
              color = 'success.main';
              break;
            }
            case 'PENDING': {
              color = 'warning.main';
              break;
            }
            case 'CANCELED': {
              color = 'error.main';
              break;
            }
            default: {
              color = undefined;
              break;
            }
          }

          return (
            <MenuItem
              key={statusOption.value}
              sx={{ color }}
              onClick={() => {
                onStatusChange(row.id, statusOption.value);
                popover.onClose();
              }}
            >
              Change status to {statusOption.label}
            </MenuItem>
          );
        })}
      </CustomPopover>
    </>
  );
};

TransactionTableRow.propTypes = TransactionTableRowProps;

export default TransactionTableRow;
