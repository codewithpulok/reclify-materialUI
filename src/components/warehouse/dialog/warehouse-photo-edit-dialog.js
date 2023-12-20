import { Box, Button, Dialog, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import Image from 'src/components/common/image';

const WarehousePhotoEditDialogProps = {
  /** @type {Photo | null} */
  photo: PropTypes.object,
  /** @type {(photo: Photo ) => {}} */
  onSubmit: PropTypes.func.isRequired,
  /** @type {() => {}} */
  onCancel: PropTypes.func.isRequired,
  /** @type {boolean} */
  open: PropTypes.bool.isRequired,
};

/**
 * @param {WarehousePhotoEditDialogProps} props
 * @returns {JSX.Element}
 */
const WarehousePhotoEditDialog = (props) => {
  const { photo, onSubmit, onCancel, open } = props;

  const methods = useForm({ defaultValues: photo });
  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    if (open && photo) {
      console.log(photo);
      reset(photo);
    }
  }, [open, photo, reset]);

  const handleChildSubmit = (event) => {
    handleSubmit(onSubmit)(event);
    // to stop calling the parent submit
    event.stopPropagation();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onCancel}>
      <FormProvider onSubmit={handleChildSubmit} methods={methods}>
        <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
          <Box sx={{ width: '100%', mb: 2 }}>
            <Image
              src={getValues('coverUrl')}
              aspect="16/9"
              alt={photo?.title}
              sx={{ borderRadius: 1 }}
            />
          </Box>

          <RHFTextField name="title" label="Photo title" fullWidth />

          <Stack direction="row" spacing={1} mt={3} justifyContent="end">
            <Button variant="soft" color="error" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="soft" color="primary" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

WarehousePhotoEditDialog.propTypes = WarehousePhotoEditDialogProps;

export default WarehousePhotoEditDialog;
