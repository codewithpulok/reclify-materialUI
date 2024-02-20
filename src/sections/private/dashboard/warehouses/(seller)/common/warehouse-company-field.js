import { useFormContext } from 'react-hook-form';

import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { RHFAccordion, RHFUpload } from 'src/components/common/hook-form';
import {
  useFileDeleteByURLMutation,
  useFilesUploadMutation,
} from 'src/redux-toolkit/services/uploadFilesApi';

const Props = {
  sx: PropTypes.object,
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseCompanyField = (props) => {
  const { sx, fieldName, label } = props;
  const { setValue } = useFormContext();

  // api state
  const [uploadFile, uploadResults] = useFilesUploadMutation();
  const [deleteFile, deleteResponse] = useFileDeleteByURLMutation();

  const handleRemove = useCallback(
    async (imgLink) => {
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
      setValue(fieldName, null);
    },
    [deleteFile, fieldName, setValue]
  );

  const handlePreview = (file) => {
    const newFile = {
      file,
      preview: URL.createObjectURL(file),
    };

    setValue(fieldName, newFile, { shouldValidate: false });

    return newFile;
  };

  const handleSuccess = (newUrl, tempUrl) => {
    URL.revokeObjectURL(tempUrl);
    setValue(fieldName, newUrl, { shouldValidate: true });
  };

  const handleError = (tempUrl) => {
    URL.revokeObjectURL(tempUrl);
    setValue(fieldName, null, { shouldValidate: true });
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
      enqueueSnackbar(`Error in uploading ${label}`, { variant: 'error' });
      console.error(`Error in uploading ${label}:`, response);
      handleError(tempFile.preview);
    }

    // handle success state
    else if (data?.success && data?.results?.[0]?.link) {
      enqueueSnackbar(`${label} uploaded`);
      console.warn(`${label} uploaded`, response);
      handleSuccess(data.results[0].link, tempFile.preview);
    }
  };

  return (
    <RHFAccordion label={label} defaultExpanded name={fieldName} sx={sx}>
      <RHFUpload
        name={fieldName}
        maxSize={3145728}
        onDrop={handleDrop}
        disabled={uploadResults?.isLoading || deleteResponse?.isLoading}
        onDelete={handleRemove}
        placeholderIllustration={false}
      />
    </RHFAccordion>
  );
};

WarehouseCompanyField.propTypes = Props;

export default WarehouseCompanyField;
