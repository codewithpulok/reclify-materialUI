import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// ----------------------------------------------------------------------

const ConfirmDialogProps = {
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

/**
 * @param {ConfirmDialogProps & import('@mui/material').DialogProps} props
 * @returns {JSX.Element}
 */
export default function ConfirmDialog(props) {
  const { title, content, action, open, onClose, ...other } = props;
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        {action}
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = ConfirmDialogProps;
