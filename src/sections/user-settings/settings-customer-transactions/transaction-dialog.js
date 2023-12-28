import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import Label from 'src/components/common/label';
import Scrollbar from 'src/components/common/scrollbar';
import { ICONS } from '../config-settings';
import TransactionDetails from './transaction-details';

const TransactionDialogProps = {
  /** @type {CustomerTransaction | undefined} */
  transaction: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancelOrder: PropTypes.func.isRequired,
};

/**
 * @param {TransactionDialogProps} props
 * @returns {JSX.Element}
 */
const TransactionDialog = (props) => {
  const { transaction, open, onClose, onCancelOrder } = props;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle display="flex" flexDirection="row" alignItems="center" width="100%" gap={1}>
        Transaction Details
        <Label
          variant="soft"
          color={
            (transaction.status === 'completed' && 'success') ||
            (transaction.status === 'pending' && 'warning') ||
            (transaction.status === 'declined' && 'error') ||
            'default'
          }
        >
          {transaction.status}
        </Label>
        <IconButton sx={{ ml: 'auto' }} onClick={onClose}>
          {ICONS.close()}
        </IconButton>
      </DialogTitle>
      <Scrollbar sx={{ height: 500, pb: 10 }}>
        <DialogContent>
          {transaction && <TransactionDetails transaction={transaction} />}
        </DialogContent>
      </Scrollbar>

      <DialogActions>
        {transaction?.status === 'pending' && (
          <Button variant="soft" color="error" onClick={onCancelOrder}>
            Cancel order
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

TransactionDialog.propTypes = TransactionDialogProps;

export default TransactionDialog;
