import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';

import { Box, Button, DialogTitle } from '@mui/material';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useBillingInfoListQuery } from 'src/redux-toolkit/services/billingInfoApi';
import { ICONS } from '../../config-custom-dialog';
import BillingAddressCreateDialog from '../create';
import BillingAddressDeleteDialog from '../delete';
import BillingAddressEditDialog from '../edit';
import Item from './item';

const Props = {
  /** @type {BillingAddress[]} */
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  selected: PropTypes.func,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BillingAddressListDialog = (props) => {
  const {
    //
    open,
    onClose,
    //
    selected,
    onSelect,
  } = props;

  // auth state
  const { user } = useAppSelector(selectAuth);

  // api state
  const billingInfoResponse = useBillingInfoListQuery();

  const createDialog = useBoolean();
  const editDialog = useDialog();
  const deleteDialog = useDialog();

  // handle select event
  const handleSelectAddress = useCallback(
    (address) => {
      onSelect(address);
      onClose();
    },
    [onClose, onSelect]
  );

  // handle error, empty, loading, & data state
  const renderList = useCallback(
    (data = []) => {
      if (!billingInfoResponse.isLoading && billingInfoResponse.isError) {
        return (
          <Box sx={{ px: 2, py: 2 }}>
            <ErrorState />
          </Box>
        );
      }

      if (!billingInfoResponse.isLoading && billingInfoResponse.isSuccess && data?.length === 0) {
        return (
          <Box sx={{ px: 2, py: 2 }}>
            <EmptyState />
          </Box>
        );
      }

      if (
        !billingInfoResponse.isLoading &&
        !billingInfoResponse.isFetching &&
        billingInfoResponse.isSuccess &&
        data?.length
      ) {
        return (
          <Stack
            spacing={1}
            sx={{
              p: 2,
              maxHeight: 80 * 8,
              overflowX: 'hidden',
            }}
          >
            {data.map((billingAddress) => (
              <Item
                key={billingAddress.id}
                billingAddress={billingAddress}
                isSelected={selected(`${billingAddress.id}`)}
                onSelect={handleSelectAddress}
                onDelete={() => deleteDialog.onOpen(billingAddress)}
                onEdit={() => editDialog.onOpen(billingAddress)}
              />
            ))}
          </Stack>
        );
      }

      return (
        <Box sx={{ px: 2 }}>
          <LoadingState />
        </Box>
      );
    },
    [
      billingInfoResponse.isError,
      billingInfoResponse.isFetching,
      billingInfoResponse.isLoading,
      billingInfoResponse.isSuccess,
      deleteDialog,
      editDialog,
      handleSelectAddress,
      selected,
    ]
  );

  // refetch only if user id changed
  useEffect(() => {
    if (user?.id) {
      billingInfoResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            p: 3,
            pb: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Address Book
          <Button
            onClick={createDialog.onTrue}
            size="small"
            startIcon={ICONS.plus()}
            sx={{ alignSelf: 'flex-end' }}
            disabled={billingInfoResponse.isLoading || billingInfoResponse?.isFetching}
          >
            New
          </Button>
        </DialogTitle>

        {renderList(billingInfoResponse.data?.results || [])}
      </Dialog>

      <BillingAddressCreateDialog onClose={createDialog.onFalse} open={createDialog.value} />
      <BillingAddressEditDialog
        onClose={editDialog.onClose}
        open={editDialog.open}
        billingAddress={editDialog.value}
      />
      <BillingAddressDeleteDialog
        open={deleteDialog.open}
        onClose={deleteDialog.onClose}
        billingAddress={deleteDialog.value}
      />
    </>
  );
};

BillingAddressListDialog.propTypes = Props;

export default BillingAddressListDialog;
