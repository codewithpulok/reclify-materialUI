import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { ACHInfoCreateForm } from 'src/components/common/custom-form';
import stripePromise from 'src/utils/stripe';

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ACHTokenDialog = (props) => {
  const { open, onClose, onSubmit } = props;

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>ACH</DialogTitle>

      <Elements stripe={stripePromise}>
        <ACHInfoCreateForm
          wrapperElement={DialogContent}
          actions={
            <DialogActions>
              <Button type="reset" onClick={onClose}>
                Cancel
              </Button>
              <LoadingButton type="submit" color="primary" variant="contained">
                Select
              </LoadingButton>
            </DialogActions>
          }
          submitCallback={onSubmit}
        />
      </Elements>
    </Dialog>
  );
};

ACHTokenDialog.propTypes = Props;

export default ACHTokenDialog;
