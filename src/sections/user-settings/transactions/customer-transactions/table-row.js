import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Link, Typography } from '@mui/material';
import { getTransactionStatusColor } from 'src/assets/dummy';
import { usePopover } from 'src/components/common/custom-popover';
import CustomPopover from 'src/components/common/custom-popover/custom-popover';
import Label from 'src/components/common/label';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { joinAddressObj } from 'src/utils/address';
import { fCurrency } from 'src/utils/format-number';
import { ICONS } from '../../config-settings';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Transaction} */
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onViewTransaction: PropTypes.func.isRequired,
  onCancelOrder: PropTypes.func.isRequired,
};

/**
 * Transection Table Row UI
 * @param {Props} props
 * @returns
 */
const TransactionTableRow = (props) => {
  const { row, selected, onCancelOrder, onViewTransaction } = props;
  const popover = usePopover(false);

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar
            alt={row.warehouse.name}
            src={row.warehouse.photos[0].link}
            sx={{ mr: 2 }}
            variant="rounded"
          />

          <ListItemText
            primary={row.warehouse.name}
            secondary={joinAddressObj(row.warehouse.address)}
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
          <Avatar alt={row.seller.displayName} src={row.seller.avatar} sx={{ mr: 2 }} />
          <Stack>
            <Link component={RouterLink} href={`${paths.dashboard.users.sellers}/${row.seller.id}`}>
              <Typography variant="body2" color="text.primary">
                {row.seller.displayName}
              </Typography>
            </Link>
          </Stack>
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

      <TableCell> {fCurrency(row.area * row.pricePerSquare)} </TableCell>

      <TableCell>
        <Label variant="soft" color={getTransactionStatusColor(row.status)}>
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
        <MenuItem
          onClick={() => {
            onViewTransaction();
            popover.onClose();
          }}
        >
          Transaction details
        </MenuItem>
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

TransactionTableRow.propTypes = Props;

export default TransactionTableRow;