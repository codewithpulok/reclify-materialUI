import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

const Props = {
  /** @type {Transaction} */
  transaction: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CustomerPurchaseActions = (props) => {
  const { user } = useAppSelector(selectAuth);
  const { transaction } = props;

  if (user?.userType === 'seller') {
    if (transaction?.status === 'pending') {
      return (
        <>
          <Button color="primary" variant="outlined" size="small">
            Complete
          </Button>
          <Button color="error" variant="outlined" size="small">
            Cancel
          </Button>
        </>
      );
    }
    if (transaction?.status === 'admin_pending') {
      return (
        <>
          <Button color="primary" variant="outlined" size="small" disabled>
            Complete
          </Button>
          <Button color="error" variant="outlined" size="small">
            Cancel
          </Button>
        </>
      );
    }
  }

  if (user?.userType === 'customer') {
    if (transaction?.status === 'pending' || transaction?.status === 'admin_pending') {
      return (
        <Button color="error" variant="outlined" size="small">
          Cancel
        </Button>
      );
    }
  }

  if (user?.userType === 'admin') {
    if (transaction?.status === 'admin_pending') {
      return (
        <>
          <Button color="primary" variant="outlined" size="small">
            Approve
          </Button>
          <Button color="error" variant="outlined" size="small">
            Cancel
          </Button>
        </>
      );
    }
  }

  return null;
};

CustomerPurchaseActions.propTypes = Props;

export default CustomerPurchaseActions;
