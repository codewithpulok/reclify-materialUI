import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import Scrollbar from 'src/components/common/scrollbar';
import { ICONS } from '../config-settings';
import TransactionDetails from './transaction-details';

const TransactionDialogProps = {
  /** @type {CustomerTransaction | undefined} */
  transaction: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @param {TransactionDialogProps} props
 * @returns {JSX.Element}
 */
const TransactionDialog = (props) => {
  const { transaction, open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        Transaction Details
        <IconButton onClick={onClose}>{ICONS.close()}</IconButton>
      </DialogTitle>
      <DialogContent>
        <Scrollbar sx={{ height: 500, pb: 4 }}>
          {transaction && <TransactionDetails transaction={transaction} />}
        </Scrollbar>
      </DialogContent>
    </Dialog>
  );
};

TransactionDialog.propTypes = TransactionDialogProps;

export default TransactionDialog;
