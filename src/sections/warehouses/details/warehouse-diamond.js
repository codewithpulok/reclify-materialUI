import { LoadingButton } from '@mui/lab';
import { Box, Rating, Stack, Tooltip, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { diamondDetails } from 'src/constant/diamond';
import { useDialog } from 'src/hooks/use-dialog';
import { useUpdateWarehouseDiamondMutation } from 'src/redux-toolkit/services/adminApi';
import { ICONS } from '../config-warehouse';

const Props = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  size: PropTypes.number,
  action: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseDiamond = (props) => {
  const { value = 0, action = false, size = 28, id } = props;

  const [updateDiamond, diamondResults] = useUpdateWarehouseDiamondMutation();
  const diamondDialog = useDialog();

  const openDiamondDialog = useCallback(
    (newValue) => {
      diamondDialog.onOpen(newValue);
    },
    [diamondDialog]
  );
  const closeDiamondDialog = useCallback(() => {
    diamondDialog.onClose();
  }, [diamondDialog]);

  const onConfirm = useCallback(async () => {
    const response = await updateDiamond({ id, diamond: diamondDialog.value });
    const { data, error } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in updating warehouse diamond!', { variant: 'error' });
      console.error('Error in updating warehouse diamond:', response);
    }

    // handle success state
    else if (data?.success) {
      enqueueSnackbar('Warehouse Diamond Updated');
      console.warn('Warehouse Diamond Updated:', response);
    }

    closeDiamondDialog();
  }, [closeDiamondDialog, diamondDialog.value, id, updateDiamond]);

  const currentDiamondDetails = useMemo(
    () => (value <= 5 && value >= 1 ? diamondDetails?.[value - 1] : undefined),
    [value]
  );

  return (
    <>
      <Tooltip
        title={
          <>
            {currentDiamondDetails?.title && (
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {currentDiamondDetails.title}
              </Typography>
            )}
            {currentDiamondDetails?.features && (
              <Stack>
                {currentDiamondDetails.features.map((f) => (
                  <Typography key={f} variant="caption">
                    - {f}
                  </Typography>
                ))}
              </Stack>
            )}
          </>
        }
        disableHoverListener={value === 0}
        placement="bottom-start"
        arrow
      >
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Rating
            readOnly={!action}
            name="warehouse-diamond"
            value={value}
            icon={ICONS.diamond_fill(size)}
            emptyIcon={ICONS.diamond_empty(size)}
            sx={{
              '& .MuiRating-iconFilled': {
                color: 'info.main',
              },
              '& .MuiRating-iconHover': {
                color: 'info.main',
              },
            }}
            onChange={(_e, v) => openDiamondDialog(v)}
          />
        </Box>
      </Tooltip>

      <ConfirmDialog
        open={diamondDialog.open}
        title="Change the warehouse diamonds?"
        content={"don't worry you can change the value any time."}
        action={
          <LoadingButton
            loading={diamondResults.isLoading}
            onClick={onConfirm}
            color="warning"
            variant="contained"
          >
            Confirm
          </LoadingButton>
        }
        onClose={closeDiamondDialog}
      />
    </>
  );
};

WarehouseDiamond.propTypes = Props;
export default WarehouseDiamond;
