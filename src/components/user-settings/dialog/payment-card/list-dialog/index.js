import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { PaymentCardCreateDialog } from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { ICONS } from '../../../config-user-settings';
import PaymentCardDeleteDialog from '../delete-dialog';
import PaymentCardEditDialog from '../edit-dialog';
import PaymentCardListItem from './item';

const PaymentCardListDialogProps = {
  list: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  selected: PropTypes.func,
};
// ----------------------------------------------------------------------

/**
 * @param {PaymentCardListDialogProps} props
 * @returns {JSX.Element}
 */
const PaymentCardListDialog = (props) => {
  const { open, list, onClose, selected, onSelect } = props;

  const openCreate = useBoolean();
  const [openEdit, setOpenEdit] = useState({ open: false, card: undefined });
  const [openDelete, setOpenDelete] = useState({ open: false, card: undefined });

  // handle open edit dialog
  const openEditDialog = useCallback((paymentCard) => {
    setOpenEdit({ open: true, card: paymentCard });
  }, []);
  // handle close edit dialog
  const closeEditDialog = useCallback(() => {
    setOpenEdit({ open: false, card: undefined });
  }, []);

  // handle open delete dialog
  const openDeleteDialog = useCallback((paymentCard) => {
    setOpenDelete({ open: true, card: paymentCard });
  }, []);
  // handle close delete dialog
  const closeDeleteDialog = useCallback(() => {
    setOpenDelete({ open: false, card: undefined });
  }, []);

  // handle select event
  const handleSelectCard = useCallback(
    (card) => {
      onSelect(card);
      onClose();
    },
    [onClose, onSelect]
  );

  // render the payment card list item
  const renderList = (
    <Stack spacing={1.5} sx={{ p: 3 }}>
      {list.map((card) => (
        <PaymentCardListItem
          key={card.id}
          card={card}
          onSelect={handleSelectCard}
          isSelected={selected(card.id)}
          onDelete={openDeleteDialog}
          onEdit={openEditDialog}
        />
      ))}
    </Stack>
  );

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3, pr: 1.5 }}
        >
          <Typography variant="h6"> Cards </Typography>

          <Button
            size="small"
            startIcon={ICONS.plus()}
            sx={{ alignSelf: 'flex-end' }}
            onClick={openCreate.onTrue}
          >
            New
          </Button>
        </Stack>

        {renderList}
      </Dialog>
      <PaymentCardCreateDialog onClose={openCreate.onFalse} open={openCreate.value} />
      <PaymentCardEditDialog
        onClose={closeEditDialog}
        open={openEdit.open}
        paymentCard={openEdit.card}
      />
      <PaymentCardDeleteDialog
        open={openDelete.open}
        onClose={closeDeleteDialog}
        paymentCard={openEdit.card}
      />
    </>
  );
};

PaymentCardListDialog.propTypes = PaymentCardListDialogProps;

export default PaymentCardListDialog;
