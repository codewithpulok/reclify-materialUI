import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { PaymentCardCreateForm } from 'src/components/common/custom-form';

// ----------------------------------------------------------------------

const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CardTokenDialog = (props) => {
  const { open, onClose, onSubmit } = props;

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Card</DialogTitle>

      <PaymentCardCreateForm
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
        hidePrimary
      />
    </Dialog>
  );
};

CardTokenDialog.propTypes = Props;

export default CardTokenDialog;
