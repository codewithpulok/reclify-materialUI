import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

import { getTransactionStatusColor } from 'src/assets/dummy';
import Label from 'src/components/common/label';
import Scrollbar from 'src/components/common/scrollbar';
import { AmountDetailsCard, WarehouseDetailsCard } from 'src/components/user-settings/cards';
import { UserDetailsCard } from 'src/components/users/cards';
import { ICONS } from 'src/sections/users/config-users';

const Props = {
  /** @type {Transaction | undefined} */
  transaction: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const TransactionDialog = (props) => {
  const { transaction, open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle display="flex" flexDirection="row" alignItems="center" width="100%" gap={1}>
        Transaction Details
        {transaction?.status && (
          <Label variant="soft" color={getTransactionStatusColor(transaction.status)}>
            {transaction.status}
          </Label>
        )}
        <IconButton sx={{ ml: 'auto' }} onClick={onClose}>
          {ICONS.close()}
        </IconButton>
      </DialogTitle>
      <Scrollbar sx={{ height: 500, pb: 10 }}>
        <DialogContent>
          <Stack spacing={1.5}>
            {transaction?.warehouse && <WarehouseDetailsCard warehouse={transaction.warehouse} />}
            {transaction?.seller && <UserDetailsCard user={transaction.seller} />}
            {transaction && (
              <AmountDetailsCard
                pricePerSquare={transaction.pricePerSquare}
                totalArea={transaction.area}
              />
            )}
          </Stack>
        </DialogContent>
      </Scrollbar>
    </Dialog>
  );
};

TransactionDialog.propTypes = Props;

export default TransactionDialog;
