import { Button, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ConfirmDialog } from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
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

  const diamondDialog = useBoolean(false);
  const openDiamondDialog = useCallback(() => diamondDialog.onTrue(), [diamondDialog]);
  const closeDiamondDialog = useCallback(() => diamondDialog.onFalse(), [diamondDialog]);

  return (
    <>
      <Rating
        name="warehouse-diamond"
        defaultValue={value}
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
        onChange={openDiamondDialog}
      />
      <ConfirmDialog
        open={diamondDialog.value}
        title="Change the warehouse diamonds?"
        content={"don't worry you can change the value any time."}
        action={
          <Button onClick={closeDiamondDialog} color="warning" variant="contained">
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
