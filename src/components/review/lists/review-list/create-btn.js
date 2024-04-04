'use client';

import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { ReviewCreateDialog } from 'src/components/common/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';

/**
 * @param {CreateBtn.propTypes} props
 * @returns {JSX.Element}
 */
const CreateBtn = (props) => {
  const { warehouseId } = props;

  // dialog state
  const createDialog = useBoolean(false);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: {
            xs: '100%',
            sm: 'auto',
          },
        }}
        onClick={createDialog.onTrue}
      >
        Add New
      </Button>

      <ReviewCreateDialog
        warehouseId={warehouseId}
        open={createDialog.value}
        onClose={createDialog.onFalse}
      />
    </>
  );
};

CreateBtn.propTypes = {
  warehouseId: PropTypes.string,
};

export default CreateBtn;
