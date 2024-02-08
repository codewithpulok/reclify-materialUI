import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';

import { DialogContent, DialogTitle } from '@mui/material';
import {
  ACHInfoCreateDialog,
  ACHInfoDeleteDialog,
  ACHInfoEditDialog,
  ICONS,
} from 'src/components/common/custom-dialog';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useAchListQuery } from 'src/redux-toolkit/services/achApi';
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
const ACHInfoListDialog = (props) => {
  const { open, onClose, selected, onSelect } = props;

  // auth state
  const { user } = useAppSelector(selectAuth);

  // api state
  const achInfoResponse = useAchListQuery();

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
      if (!achInfoResponse.isLoading && achInfoResponse.isError) {
        return <ErrorState />;
      }

      if (!achInfoResponse.isLoading && achInfoResponse.isSuccess && data?.length === 0) {
        return <EmptyState />;
      }

      if (
        !achInfoResponse.isLoading &&
        !achInfoResponse.isFetching &&
        achInfoResponse.isSuccess &&
        data?.length
      ) {
        return (
          <Stack
            spacing={1}
            sx={{
              p: 0.5,
              maxHeight: 80 * 8,
              overflowX: 'hidden',
            }}
          >
            {data.map((achInfo) => (
              <Item
                key={achInfo.id}
                ach={achInfo}
                onSelect={handleSelectCard}
                isSelected={selected(achInfo.id)}
                onDelete={deleteDialog.onOpen}
                onEdit={editDialog.onOpen}
              />
            ))}
          </Stack>
        );
      }

      return <LoadingState />;
    },
    [
      achInfoResponse.isError,
      achInfoResponse.isFetching,
      achInfoResponse.isLoading,
      achInfoResponse.isSuccess,
      deleteDialog.onOpen,
      editDialog.onOpen,
      handleSelectCard,
      selected,
    ]
  );

  // refetch only if user id changed
  useEffect(() => {
    if (user?.id) {
      achInfoResponse.refetch();
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
          ACH Info
          <Button
            size="small"
            startIcon={ICONS.plus()}
            sx={{ alignSelf: 'flex-end' }}
            onClick={createDialog.onTrue}
            disabled={achInfoResponse.isLoading || achInfoResponse?.isFetching}
          >
            New
          </Button>
        </DialogTitle>

        <DialogContent sx={{ my: 2 }}>
          {renderList(achInfoResponse.data?.results || [])}
        </DialogContent>
      </Dialog>
      <ACHInfoCreateDialog onClose={createDialog.onFalse} open={createDialog.value} />
      <ACHInfoEditDialog
        open={editDialog.open}
        ach={editDialog.value}
        onClose={editDialog.onClose}
      />
      <ACHInfoDeleteDialog
        open={deleteDialog.open}
        ach={deleteDialog.value}
        onClose={deleteDialog.onClose}
      />
    </>
  );
};

ACHInfoListDialog.propTypes = Props;

export default ACHInfoListDialog;
