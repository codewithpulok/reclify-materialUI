import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

const Props = {
  /** @type {Transaction} */
  transaction: PropTypes.object,
  transactionCancel: PropTypes.func,
  transactionComplete: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AdminApproveActions = (props) => {
  const { user } = useAppSelector(selectAuth);
  const { transaction, transactionCancel, transactionComplete } = props;

  if (user?.userType === 'customer') {
    if (transaction?.status === 'pending') {
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
  }

  return null;
};

AdminApproveActions.propTypes = Props;

export default AdminApproveActions;
