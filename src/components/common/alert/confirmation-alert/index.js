import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';

const ConfirmationAlertProps = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  onAgree: PropTypes.func.isRequired,
  onDisagree: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * Confirmation Alert box
 * @param {ConfirmationAlertProps} props
 * @returns
 */
const ConfirmationAlert = ({ open, title, text, onAgree, onDisagree, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onDisagree}>Disagree</Button>
      <Button onClick={onAgree} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationAlert.propTypes = ConfirmationAlertProps;

export default ConfirmationAlert;
