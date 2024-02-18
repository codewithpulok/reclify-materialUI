import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

import { useMemo } from 'react';
import { getTransactionStatusColor } from 'src/assets/dummy';
import Label from 'src/components/common/label';
import Scrollbar from 'src/components/common/scrollbar';
import { AmountDetailsCard, WarehouseDetailsCard } from 'src/components/user-settings/cards';
import { UserDetailsCard } from 'src/components/users/cards';
import { getTransactionStatusLabel } from 'src/constant/transaction';
import { ICONS } from '../../icons';

const Props = {
  /** @type {Transaction | undefined} */
  transaction: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancelOrder: PropTypes.func,
  onCompleteOrder: PropTypes.func,
  onApproveOrder: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const TransactionDetailsDialog = (props) => {
  const { transaction = {}, open, onClose, onCancelOrder, onCompleteOrder, onApproveOrder } = props;

  const isAdminPending = useMemo(
    () => transaction?.status === 'admin_pending',
    [transaction?.status]
  );
  const isPending = useMemo(() => transaction?.status === 'pending', [transaction?.status]);
  const showActions = isAdminPending || isPending;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle display="flex" flexDirection="row" alignItems="center" width="100%" gap={1}>
        Transaction Details
        {transaction?.status && (
          <Label variant="soft" color={getTransactionStatusColor(transaction.status)}>
            {getTransactionStatusLabel(transaction.status)}
          </Label>
        )}
        <IconButton sx={{ ml: 'auto' }} onClick={onClose}>
          {ICONS.close()}
        </IconButton>
      </DialogTitle>
      <Scrollbar sx={{ height: 500, pb: 2 }}>
        <DialogContent>
          <Stack spacing={1.5}>
            {transaction?.warehouse && <WarehouseDetailsCard warehouse={transaction.warehouse} />}
            {transaction?.seller && <UserDetailsCard user={transaction.seller} userType="seller" />}
            {transaction?.customer && (
              <UserDetailsCard user={transaction.customer} userType="customer" />
            )}
            {transaction?.purchase && <AmountDetailsCard purchase={transaction?.purchase} />}
          </Stack>
        </DialogContent>
      </Scrollbar>
      <DialogActions>
        {showActions && (
          <>
            {onCancelOrder !== undefined && (
              <Button variant="soft" color="error" onClick={onCancelOrder}>
                Cancel order
              </Button>
            )}
            {onCompleteOrder !== undefined && (
              <Button
                variant="soft"
                color="success"
                onClick={onCompleteOrder}
                disabled={isAdminPending}
              >
                Complete order
              </Button>
            )}
            {onApproveOrder !== undefined && isAdminPending && (
              <Button variant="soft" color="success" onClick={onApproveOrder}>
                Approve order
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

TransactionDetailsDialog.propTypes = Props;

export default TransactionDetailsDialog;
