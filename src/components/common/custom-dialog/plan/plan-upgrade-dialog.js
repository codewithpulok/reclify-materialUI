import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { usePlanUpgradeMutation } from 'src/redux-toolkit/services/planApi';
import ConfirmDialog from '../confirm-dialog';

const Props = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  planId: PropTypes.string,
  isAnnual: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PlanUpgradeDialog = (props) => {
  const { onClose, open, planId, isAnnual } = props;

  const [upgradePlan, upgradeResponse] = usePlanUpgradeMutation();

  const handleUpgradePlan = useCallback(async () => {
    console.log('Upgrade Plan: ', { planId, isAnnual });

    const response = await upgradePlan({ id: planId, annualPlan: isAnnual });
    const { data, error } = response;

    if (error || data?.isError) {
      enqueueSnackbar('Error in upgrading plan', { variant: 'error' });
      console.error('Error in upgrading plan', response);
    } else if (!error || data?.success) {
      enqueueSnackbar('Plan Upgraded!');
      console.warn('Plan Upgraded!', response);
      onClose();
    }
  }, [planId, isAnnual, upgradePlan, onClose]);

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="Upgrade Plan!"
      content="By upgrading plan you'll get all extra features & you will subscribe to a monthly fee."
      action={
        <LoadingButton
          loading={upgradeResponse?.isLoading}
          onClick={handleUpgradePlan}
          color="primary"
          variant="contained"
        >
          Confirm
        </LoadingButton>
      }
    />
  );
};

PlanUpgradeDialog.propTypes = Props;

export default PlanUpgradeDialog;
