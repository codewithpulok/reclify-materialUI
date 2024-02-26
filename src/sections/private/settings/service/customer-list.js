import { Button, IconButton, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFAccordion, RHFTextField, RHFUpload } from 'src/components/common/hook-form';
import {
  useFileDeleteByURLMutation,
  useFilesUploadMutation,
} from 'src/redux-toolkit/services/uploadFilesApi';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

const Props = {};
const fieldName = 'customerList';
const fieldLabel = 'Customer List';
const defaultValues = { name: '', image: '' };

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CustomerList = (props) => {
  const { control } = useFormContext();
  const { append, fields, remove } = useFieldArray({ name: fieldName, control, keyName: '_id' });

  // add a new customer field
  const addCustomer = () => {
    append(defaultValues);
  };

  // remove a customer field
  const removeCustomer = (index) => {
    remove(index);
  };

  return (
    <RHFAccordion name={fieldName} label={fieldLabel} defaultExpanded>
      <Stack spacing={1}>
        {fields.map((field, index) => (
          <CustomerField index={index} onDelete={() => removeCustomer(index)} key={field._id} />
        ))}

        <Button color="primary" variant="soft" onClick={addCustomer} fullWidth>
          Add Customer
        </Button>
      </Stack>
    </RHFAccordion>
  );
};

CustomerList.propTypes = Props;

export default CustomerList;

// ----------------------------------------------------------------------

const CProps = {
  onDelete: PropTypes.func,
  index: PropTypes.number,
};

// ----------------------------------------------------------------------

/**
 * @param {CProps} props
 * @returns {JSX.Element}
 */
const CustomerField = (props) => {
  const { onDelete, index } = props;

  const { setValue } = useFormContext();
  const imageFieldName = `${fieldName}.${index}.image`;
  const nameFieldName = `${fieldName}.${index}.name`;

  // api state
  const [uploadFile, uploadResults] = useFilesUploadMutation();
  const [deleteFile, deleteResponse] = useFileDeleteByURLMutation();

  const handleRemove = useCallback(
    async (e, imgLink) => {
      const response = await deleteFile(imgLink);
      const { error, data } = response;

      // handle error state
      if (error || data.isError) {
        console.error('Image Delete Error:', error || data);
        enqueueSnackbar('Error in deleting Images', { variant: 'error' });
      }

      // handle success state
      else if (data && data?.success) {
        console.log('Image Deleted Successfully: ', response);
        enqueueSnackbar('Image Deleted successfully');
      }
      setValue(imageFieldName, null);
    },
    [deleteFile, imageFieldName, setValue]
  );

  const handlePreview = (file) => {
    const newFile = {
      file,
      preview: URL.createObjectURL(file),
    };

    setValue(imageFieldName, newFile.preview, { shouldValidate: false });

    return newFile;
  };

  const handleSuccess = (newUrl, tempUrl) => {
    URL.revokeObjectURL(tempUrl);
    console.log({ newUrl });
    setValue(imageFieldName, newUrl, { shouldValidate: true });
  };

  const handleError = (tempUrl) => {
    URL.revokeObjectURL(tempUrl);
    setValue(imageFieldName, null, { shouldValidate: true });
  };

  const handleDrop = async (acceptedFiles) => {
    // check file
    const file = acceptedFiles[0];
    if (!file) return;
    // handle temp file
    const tempFile = handlePreview(file);

    const response = await uploadFile([tempFile.file]);
    const { error, data } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in uploading logo', { variant: 'error' });
      console.error('Error in uploading logo:', response);
      handleError(tempFile.preview);
    }

    // handle success state
    else if (data?.success && data?.results?.[0]?.link) {
      enqueueSnackbar('Logo uploaded');
      console.warn('Logo uploaded', response);
      handleSuccess(data.results[0].link, tempFile.preview);
    }
  };

  return (
    <Stack spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="overline" color="text.secondary">
          customer #{index + 1}
        </Typography>
        <IconButton onClick={onDelete} color="error" size="small">
          {ICONS.delete()}
        </IconButton>
      </Stack>

      <RHFTextField name={nameFieldName} label="Name" fullWidth />
      <RHFUpload
        name={imageFieldName}
        maxSize={3145728}
        onDrop={handleDrop}
        disabled={uploadResults?.isLoading || deleteResponse?.isLoading}
        onDelete={handleRemove}
        placeholderIllustration={false}
      />
    </Stack>
  );
};

CustomerField.propTypes = CProps;
