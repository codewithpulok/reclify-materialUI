import { Button, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { ICONS } from '../config-warehouse';

const Props = {
  value: PropTypes.number.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseDiamond = (props) => {
  const { value = 0 } = props;

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

  return (
    <>
      <Rating
        name="warehouse-diamond"
        value={diamond}
        icon={ICONS.diamond_fill(28)}
        emptyIcon={ICONS.diamond_empty(28)}
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
