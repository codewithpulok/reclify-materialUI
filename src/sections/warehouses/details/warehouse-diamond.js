import { Box, Button, Rating, Stack, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { diamondDetails } from 'src/constant/diamond';
import { ICONS } from '../config-warehouse';

const Props = {
  value: PropTypes.number.isRequired,
  size: PropTypes.number,
  action: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseDiamond = (props) => {
  const { value = 0, action = false, size = 28 } = props;

  const [diamond, setDiamond] = useState(value);

  const [diamondDialog, setDiamondDialog] = useState({ open: false, value: undefined });
  const openDiamondDialog = useCallback(
    (newValue) => setDiamondDialog({ open: true, value: newValue }),
    []
  );
  const closeDiamondDialog = useCallback(
    () => setDiamondDialog({ open: false, value: undefined }),
    []
  );

  const onConfirm = useCallback(() => {
    setDiamond(diamondDialog.value);
    closeDiamondDialog();
  }, [closeDiamondDialog, diamondDialog.value]);

  const currentDiamondDetails = useMemo(
    () => (diamond <= 5 && diamond >= 1 ? diamondDetails?.[diamond - 1] : undefined),
    [diamond]
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
        disableHoverListener={diamond === 0}
        placement="bottom-start"
        arrow
      >
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Rating
            readOnly={!action}
            name="warehouse-diamond"
            value={diamond}
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
          <Button onClick={onConfirm} color="warning" variant="contained">
            Confirm
          </Button>
        }
        onClose={closeDiamondDialog}
      />
    </>
  );
};

WarehouseDiamond.propTypes = Props;
export default WarehouseDiamond;
