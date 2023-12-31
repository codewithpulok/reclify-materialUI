import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Button } from '@mui/material';
import { ICONS } from 'src/components/user-settings/config-user-settings';
import { useBoolean } from 'src/hooks/use-boolean';
import BillingAddressCreateDialog from '../create-dialog';
import BillingAddressDeleteDialog from '../delete-dialog';
import BillingAddressEditDialog from '../edit-dialog';
import BillingAddressListItem from './item';

const BillingAddressListDialogProps = {
  /** @type {BillingAddress[]} */
  list: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  selected: PropTypes.func,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

/**
 * @param {BillingAddressListDialogProps} props
 * @returns {JSX.Element}
 */
const BillingAddressListDialog = (props) => {
  const {
    title = 'Address Book',
    list,
    //
    open,
    onClose,
    //
    selected,
    onSelect,
  } = props;

  const openCreate = useBoolean();
  const [openEdit, setOpenEdit] = useState({ open: false, address: undefined });
  const [openDelete, setOpenDelete] = useState({ open: false, address: undefined });

  // handle open edit dialog
  const openEditDialog = useCallback((billingAddress) => {
    setOpenEdit({ open: true, address: billingAddress });
  }, []);
  // handle close edit dialog
  const closeEditDialog = useCallback(() => {
    setOpenEdit({ open: false, address: undefined });
  }, []);

  // handle open delete dialog
  const openDeleteDialog = useCallback((billingAddress) => {
    setOpenDelete({ open: true, address: billingAddress });
  }, []);
  // handle close delete dialog
  const closeDeleteDialog = useCallback(() => {
    setOpenDelete({ open: false, address: undefined });
  }, []);

  // handle select event
  const handleSelectAddress = useCallback(
    (address) => {
      onSelect(address);
      onClose();
    },
    [onClose, onSelect]
  );

  const renderList = (
    <Stack
      spacing={0.5}
      sx={{
        p: 0.5,
        maxHeight: 80 * 8,
        overflowX: 'hidden',
      }}
    >
      {list.map((billingAddress) => (
        <BillingAddressListItem
          key={billingAddress.id}
          billingAddress={billingAddress}
          isSelected={selected(`${billingAddress.id}`)}
          onSelect={handleSelectAddress}
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
          <Typography variant="h6"> {title} </Typography>

          <Button
            onClick={openCreate.onTrue}
            size="small"
            startIcon={ICONS.plus()}
            sx={{ alignSelf: 'flex-end' }}
          >
            New
          </Button>
        </Stack>

        {renderList}
      </Dialog>

      <BillingAddressCreateDialog onClose={openCreate.onFalse} open={openCreate.value} />
      <BillingAddressEditDialog
        onClose={closeEditDialog}
        open={openEdit.open}
        billingAddress={openEdit.address}
      />
      <BillingAddressDeleteDialog
        open={openDelete.open}
        onClose={closeDeleteDialog}
        billingAddress={openEdit.address}
      />
    </>
  );
};

BillingAddressListDialog.propTypes = BillingAddressListDialogProps;

export default BillingAddressListDialog;
