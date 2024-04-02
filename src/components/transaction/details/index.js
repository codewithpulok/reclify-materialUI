import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

import { Container, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';

import {
  ApproveTransactionDialog,
  CancelTransactionAdminDialog,
  CancelTransactionDialog,
  CompleteTransactionDialog,
} from 'src/components/common/custom-dialog';
import Label from 'src/components/common/label';
import { AmountDetailsCard, WarehouseDetailsCard } from 'src/components/user-settings/cards';
import { UserCard } from 'src/components/users/cards';
import { getTransactionStatusColor, getTransactionStatusLabel } from 'src/constant/transaction';
import { useDialog } from 'src/hooks/use-dialog';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const Props = {
  /** @type {Transaction} */
  transaction: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const TransactionDetails = (props) => {
  const { transaction } = props;
  const appearance = useAppearance();
  const { user } = useAppSelector(selectAuth);

  // app states
  const isAdminPending = useMemo(
    () => transaction?.status === 'admin_pending',
    [transaction?.status]
  );
  const isPending = useMemo(() => transaction?.status === 'pending', [transaction?.status]);
  const showActions = isAdminPending || isPending;

  // dialog states
  const completeDialog = useDialog();
  const approveDialog = useDialog();
  const cancelDialog = useDialog();

  return (
    <>
      <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
        <Grid container spacing={1.2}>
          <Grid item xs={12} mb={3}>
            <Stack spacing={0.2}>
              <Typography variant="h4">Transaction #{transaction?.id}</Typography>
              <Stack direction="row" spacing={1.2} alignItems="center" flexWrap="wrap">
                {/* transaction time */}
                <Typography variant="body2" color="text.secondary">
                  {fDateTime(transaction?.createdAt)}
                </Typography>

                {/* transaction status */}
                {transaction?.status && (
                  <Label variant="soft" color={getTransactionStatusColor(transaction.status)}>
                    {getTransactionStatusLabel(transaction.status)}
                  </Label>
                )}
              </Stack>
              {showActions && (
                <Stack
                  direction="row"
                  spacing={0.8}
                  alignItems="center"
                  flexWrap="wrap"
                  mt={3}
                  justifyContent="flex-end"
                >
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => cancelDialog.onOpen(transaction)}
                  >
                    Cancel order
                  </Button>

                  {user?.userType === 'seller' && isPending && (
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() => completeDialog.onOpen(transaction)}
                    >
                      Complete order
                    </Button>
                  )}

                  {user?.userType === 'admin' && isAdminPending && (
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() => approveDialog.onOpen(transaction)}
                    >
                      Approve order
                    </Button>
                  )}
                </Stack>
              )}
            </Stack>
          </Grid>
          <Grid item xs={7}>
            <Stack spacing={1.5}>
              {transaction?.warehouse && <WarehouseDetailsCard warehouse={transaction.warehouse} />}
            </Stack>
          </Grid>
          <Grid item xs={5}>
            <Stack spacing={1.5}>
              {transaction?.seller && <UserCard user={transaction.seller} userType="seller" />}
              {transaction?.customer && (
                <UserCard user={transaction.customer} userType="customer" />
              )}
              {transaction?.purchase && <AmountDetailsCard purchase={transaction?.purchase} />}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <ApproveTransactionDialog
        open={approveDialog.open}
        onClose={approveDialog.onClose}
        transaction={approveDialog.value}
      />

      <CancelTransactionAdminDialog
        open={cancelDialog.open && user?.userType === 'admin'}
        onClose={cancelDialog.onClose}
        transaction={cancelDialog.value}
      />

      <CancelTransactionDialog
        open={cancelDialog.open && (user?.userType === 'customer' || user?.userType === 'seller')}
        onClose={cancelDialog.onClose}
        transaction={cancelDialog.value}
      />

      <CompleteTransactionDialog
        open={completeDialog.open}
        onClose={completeDialog.onClose}
        transaction={completeDialog.value}
      />
    </>
  );
};

TransactionDetails.propTypes = Props;

export default TransactionDetails;
