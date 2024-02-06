import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { usePlanCancelMutation } from 'src/redux-toolkit/services/planApi';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PlanCancelDialog = (props) => {
  const { onClose, open } = props;

  const [cancelPlan, cancelResponse] = usePlanCancelMutation();

  const handleUpgradePlan = useCallback(async () => {
    console.log('Cancel Plan');
    const response = await cancelPlan();
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in canceling plan', { variant: 'error' });
      console.error('Error in canceling plan', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Plan Canceled!');
      console.warn('Plan Canceled!', response);
      onClose();
    }
  }, [cancelPlan, onClose]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Cancel Plan!"
      content="Your current plan will go back to the free plan."
      action={
        <LoadingButton
          loading={cancelResponse?.isLoading}
          onClick={handleUpgradePlan}
          color="error"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

PlanCancelDialog.propTypes = Props;

export default PlanCancelDialog;
