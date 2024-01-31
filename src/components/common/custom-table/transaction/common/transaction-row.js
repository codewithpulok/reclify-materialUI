import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Chip, Link, Tooltip, Typography } from '@mui/material';
import { usePopover } from 'src/components/common/custom-popover';
import CustomPopover from 'src/components/common/custom-popover/custom-popover';
import Label from 'src/components/common/label';
import { getTransactionStatusColor, getTransactionStatusLabel } from 'src/constant/transaction';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { joinAddressObj } from 'src/utils/address';
import { fCurrency } from 'src/utils/format-number';
import { getPrimaryPhoto } from 'src/utils/photos';
import { ICONS } from '../../icons';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Transaction} */
  row: PropTypes.object.isRequired,
  /** @type {(id: string, newStatus: TransactionStatus) => {}} */
  onViewTransaction: PropTypes.func.isRequired,
  show: PropTypes.array,
  onCancelOrder: PropTypes.func,
  onConfirmOrder: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns
 */
const TransactionRow = (props) => {
  const { row, onViewTransaction, show = [], onCancelOrder, onConfirmOrder } = props;
  const popover = usePopover(false);
  const { user } = useAppSelector(selectAuth);

  const warehouseImage = getPrimaryPhoto(row?.photos);

  const renderPrimary = (
    <TableRow hover>
      {show.includes('warehouse') && (
        <TableCell>
          <Stack direction="row" alignItems="center">
            <Avatar
              alt={row.warehouse.title}
              src={warehouseImage}
              sx={{ mr: 2 }}
              variant="rounded"
            />
            <ListItemText
              primary={row.warehouse?.title}
              secondary={joinAddressObj(row.warehouse?.address) || 'Address not available'}
              primaryTypographyProps={{ typography: 'body2' }}
              secondaryTypographyProps={{
                color: 'text.disabled',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                webkitlineclamp: '1',
                webkitboxorient: 'vertical',
              }}
            />
          </Stack>
        </TableCell>
      )}

      {show.includes('invoice') && (
        <TableCell>
          <Tooltip title="Click to visit invoice PDF" arrow>
            <Chip
              label="Invoice"
              icon={ICONS.invoice()}
              clickable
              variant="outlined"
              component={RouterLink}
              href="#"
            />
          </Tooltip>
        </TableCell>
      )}

      {show.includes('seller') && (
        <TableCell>
          <Stack direction="row" alignItems="center">
            <Avatar alt={row.seller?.firstName} src={row.seller.avatar} sx={{ mr: 2 }} />
            <Stack>
              <Link
                component={RouterLink}
                href={`${paths.dashboard.users.sellers}/${row.seller.id}`}
              >
                <Typography variant="body2" color="text.primary">
                  {row.seller?.firstName} {row.seller?.lastName}
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </TableCell>
      )}

      {show.includes('customer') && (
        <TableCell>
          <Stack direction="row" alignItems="center">
            <Avatar alt={row.customer?.firstName} src={row.customer.avatar} sx={{ mr: 2 }} />
            <Stack>
              <Link
                component={RouterLink}
                href={`${paths.dashboard.users.customers}/${row.customer.id}`}
              >
                <Typography variant="body2" color="text.primary">
                  {row.customer?.firstName} {row.customer?.lastName}
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </TableCell>
      )}

      {show.includes('createdAt') && (
        <TableCell>
          <ListItemText
            primary={
              row?.createdAt
                ? format(new Date(row?.createdAt), 'dd MMM yyyy')
                : 'Date not available'
            }
            secondary={
              row?.createdAt ? format(new Date(row?.createdAt), 'p') : 'Time not available'
            }
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
      )}

      {show.includes('price') && <TableCell> {fCurrency(row.purcase?.total)} </TableCell>}

      {show.includes('status') && (
        <TableCell>
          <Label variant="soft" color={getTransactionStatusColor(row.status)}>
            {getTransactionStatusLabel(row.status)}
          </Label>
        </TableCell>
      )}

      {show.includes('actions') && (
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            {ICONS.more()}
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );

  const renderMenu = (
    <CustomPopover
      open={popover.open}
      onClose={popover.onClose}
      arrow="right-top"
      sx={{ width: 300 }}
    >
      <MenuItem
        onClick={() => {
          onViewTransaction();
          popover.onClose();
        }}
      >
        Transaction details
      </MenuItem>

      {row?.status === 'pending' ||
        (row?.status === 'admin_pending' && (
          <>
            {onConfirmOrder !== undefined && (
              <MenuItem
                color="success"
                onClick={() => {
                  onConfirmOrder();
                  popover.onClose();
                }}
                disabled={row?.status === 'admin_pending' && user?.userType !== 'admin'}
              >
                Confirm Order
              </MenuItem>
            )}

            {onCancelOrder !== undefined && (
              <MenuItem
                color="error"
                onClick={() => {
                  onCancelOrder();
                  popover.onClose();
                }}
              >
                Cancel Order
              </MenuItem>
            )}
          </>
        ))}
    </CustomPopover>
  );

  return (
    <>
      {renderPrimary}
      {renderMenu}
    </>
  );
};

TransactionRow.propTypes = Props;

export default TransactionRow;
