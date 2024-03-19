import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import Label from 'src/components/common/label';
import { getTransactionStatusColor } from 'src/constant/transaction';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

const Props = {
  /** @type {Transaction} */
  transaction: PropTypes.object,
  transactionCancel: PropTypes.func,
  transactionComplete: PropTypes.func,
  adminTransactionCancel: PropTypes.func,
  transactionApprove: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CustomerPurchaseActions = (props) => {
  const { user } = useAppSelector(selectAuth);
  const {
    transaction,
    transactionCancel,
    transactionComplete,
    adminTransactionCancel,
    transactionApprove,
  } = props;

  if (user?.userType === 'seller') {
    if (transaction?.status === 'pending') {
      return (
        <>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => transactionComplete(transaction)}
          >
            Approve
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={() => transactionCancel(transaction)}
          >
            Decline
          </Button>
        </>
      );
    }
    if (transaction?.status === 'admin_pending') {
      return (
        <>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => transactionComplete(transaction)}
            disabled
          >
            Approve
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={() => transactionCancel(transaction)}
          >
            Decline
          </Button>
        </>
      );
    }
  }

  if (user?.userType === 'customer') {
    if (transaction?.status === 'pending' || transaction?.status === 'admin_pending') {
      return (
        <Button
          color="error"
          variant="outlined"
          size="small"
          onClick={() => transactionCancel(transaction)}
        >
          Decline
        </Button>
      );
    }
  }

  if (user?.userType === 'admin') {
    if (transaction?.status === 'admin_pending') {
      return (
        <>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => transactionApprove(transaction)}
          >
            Approve
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={() => adminTransactionCancel(transaction)}
          >
            Decline
          </Button>
        </>
      );
    }
  }

  if (transaction?.status === 'approved') {
    return (
      <Label color={getTransactionStatusColor('approved')} variant="soft">
        Approved
      </Label>
    );
  }

  if (transaction?.status === 'cancelled') {
    return (
      <Label color={getTransactionStatusColor('cancelled')} variant="soft">
        Cancelled
      </Label>
    );
  }

  if (transaction?.status === 'completed') {
    return (
      <Label color={getTransactionStatusColor('completed')} variant="soft">
        Completed
      </Label>
    );
  }

  return null;
};

CustomerPurchaseActions.propTypes = Props;

export default CustomerPurchaseActions;
