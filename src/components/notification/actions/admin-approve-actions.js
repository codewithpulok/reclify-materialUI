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
const AdminApproveActions = (props) => {
  const { user } = useAppSelector(selectAuth);
  const { transaction } = props;

  if (user?.userType === 'customer') {
    if (transaction?.status === 'pending') {
      return (
        <Button color="error" variant="outlined" size="small">
          Cancel
        </Button>
      );
    }
  }

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
  }

  return null;
};

AdminApproveActions.propTypes = Props;

export default AdminApproveActions;
