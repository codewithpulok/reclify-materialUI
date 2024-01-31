import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import Image from 'src/components/common/image';

const Props = {
  /** @type {Photo | null} */
  photo: PropTypes.object,
  /** @type {(photo: Photo ) => {}} */
  onSubmit: PropTypes.func.isRequired,
  /** @type {() => {}} */
  onCancel: PropTypes.func.isRequired,
  /** @type {boolean} */
  open: PropTypes.bool.isRequired,
};

/** @type {Photo} */
const defaultValues = {
  id: '',
  link: '',
  primary: false,
  title: '',
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const EditDialog = (props) => {
  const { photo, onSubmit, onCancel, open } = props;

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    if (open && photo) {
      reset({ ...defaultValues, ...photo });
    }
  }, [open, photo, reset]);

  const handleChildSubmit = (event) => {
    handleSubmit(onSubmit)(event);
    // to stop calling the parent submit
    event.stopPropagation();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onCancel}>
      <DialogTitle>Edit Photo</DialogTitle>
      <FormProvider onSubmit={handleChildSubmit} methods={methods}>
        <DialogContent>
          <Box sx={{ width: '100%', mb: 2 }}>
            <Image
              src={getValues('link')}
              aspect="16/9"
              alt={photo?.title}
              sx={{ borderRadius: 1 }}
            />
          </Box>

          <RHFTextField name="title" label="Photo title" fullWidth />
          <RHFSwitch name="primary" label="Primary" />
        </DialogContent>

        <DialogActions>
          <Stack direction="row" spacing={1} justifyContent="end">
            <Button variant="soft" color="error" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

EditDialog.propTypes = Props;

export default EditDialog;
