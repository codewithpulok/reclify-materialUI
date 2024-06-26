import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';

import { Box, DialogTitle } from '@mui/material';
import {
  ICONS,
  PaymentCardCreateDialog,
  PaymentCardDeleteDialog,
  PaymentCardEditDialog,
} from 'src/components/common/custom-dialog';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useCardListQuery } from 'src/redux-toolkit/services/cardApi';
import Item from './item';

const Props = {
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
const PaymentCardListDialog = (props) => {
  const { open, onClose, selected, onSelect } = props;

  // auth state
  const { user } = useAppSelector(selectAuth);

  // api state
  const cardListResponse = useCardListQuery();

  const createDialog = useBoolean();
  const editDialog = useDialog();
  const deleteDialog = useDialog();

  // handle select event
  const handleSelectCard = useCallback(
    (card) => {
      onSelect(card);
      onClose();
    },
    [onClose, onSelect]
  );

  // handle error, empty, loading, & data state
  const renderList = useCallback(
    (data = []) => {
      if (!cardListResponse.isLoading && cardListResponse.isError) {
        return (
          <Box sx={{ px: 2, py: 2 }}>
            <ErrorState />
          </Box>
        );
      }

      if (!cardListResponse.isLoading && cardListResponse.isSuccess && data?.length === 0) {
        return (
          <Box sx={{ px: 2, py: 2 }}>
            <EmptyState />
          </Box>
        );
      }

      if (
        !cardListResponse.isLoading &&
        !cardListResponse.isFetching &&
        cardListResponse.isSuccess &&
        data?.length
      ) {
        return (
          <Stack
            spacing={1}
            sx={{
              p: 2,
              maxHeight: 80 * 8,
              overflowX: 'hidden',
              mt: 1,
            }}
          >
            {data.map((card) => (
              <Item
                key={card.id}
                card={card}
                onSelect={handleSelectCard}
                isSelected={selected(card.id)}
                onDelete={deleteDialog.onOpen}
                onEdit={editDialog.onOpen}
              />
            ))}
          </Stack>
        );
      }

      return (
        <Box sx={{ px: 2, py: 2 }}>
          <LoadingState />
        </Box>
      );
    },
    [
      cardListResponse.isError,
      cardListResponse.isFetching,
      cardListResponse.isLoading,
      cardListResponse.isSuccess,
      deleteDialog.onOpen,
      editDialog.onOpen,
      handleSelectCard,
      selected,
    ]
  );

  // refetch only if user id changed
  useEffect(() => {
    if (user?.id) {
      cardListResponse.refetch();
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
          Payment Cards
          <Button
            size="small"
            startIcon={ICONS.plus()}
            sx={{ alignSelf: 'flex-end' }}
            onClick={createDialog.onTrue}
            disabled={cardListResponse.isLoading || cardListResponse?.isFetching}
          >
            New
          </Button>
        </DialogTitle>

        {renderList(cardListResponse.data?.results || [])}
      </Dialog>
      <PaymentCardCreateDialog onClose={createDialog.onFalse} open={createDialog.value} />
      <PaymentCardEditDialog
        open={editDialog.open}
        card={editDialog.value}
        onClose={editDialog.onClose}
      />
      <PaymentCardDeleteDialog
        open={deleteDialog.open}
        card={deleteDialog.value}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};

PaymentCardListDialog.propTypes = Props;

export default PaymentCardListDialog;
