import { useFormContext } from 'react-hook-form';

import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { RHFUploadAvatar } from 'src/components/common/hook-form';
import { useDialog } from 'src/hooks/use-dialog';
import {
  useFileDeleteByURLMutation,
  useFilesUploadMutation,
} from 'src/redux-toolkit/services/uploadFilesApi';
import { AvatarCrop } from '../../custom-dialog';

// ----------------------------------------------------------------------

const Props = {
  sx: PropTypes.object,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const blobUrlToFile = (blobUrl) =>
  new Promise((resolve) => {
    fetch(blobUrl).then((res) => {
      res.blob().then((blob) => {
        // please change the file.extension with something more meaningful
        // or create a utility function to parse from URL
        const file = new File([blob], 'file.jpeg', { type: blob.type });
        resolve(file);
      });
    });
  });

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PhotoField = (props) => {
  const { sx, fieldName, label } = props;

  // dialog state
  const cropDialog = useDialog();

  // api state
  const [uploadFile, uploadResults] = useFilesUploadMutation();
  const [deleteFile, deleteResponse] = useFileDeleteByURLMutation();

  // form state
  const { setValue } = useFormContext();

  const handleRemove = useCallback(
    async (_e, imgLink) => {
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

  const handleDrop = (acceptedFiles) => {
    // check file
    const file = acceptedFiles[0];
    if (!file) return;
    cropDialog.onOpen(file);
  };

  const handleUpload = async (blobUrl) => {
    const file = await blobUrlToFile(blobUrl);
    if (!file) return;
    // handle temp file
    const tempFile = handlePreview(file);

    const response = await uploadFile([tempFile.file]);
    const { error, data } = response;

    // handle error state
    if (error || data?.isError) {
      enqueueSnackbar(`Error in uploading ${label}`, { variant: 'error' });
      console.error(`Error in uploading ${label}`, response);
      handleError(tempFile.preview);
    }

    // handle success state
    else if (data?.success && data?.results?.[0]?.link) {
      enqueueSnackbar(`${label} uploaded`);
      console.warn(`${label} uploaded`, response);
      handleSuccess(data.results[0].link, tempFile.preview);
    }

    cropDialog.onClose();
  };

  return (
    <>
      <RHFUploadAvatar
        name={fieldName}
        maxSize={3145728}
        onDrop={handleDrop}
        sx={sx}
        disabled={uploadResults?.isLoading || deleteResponse?.isLoading}
        onDelete={handleRemove}
      />
      <AvatarCrop
        croppedCallback={handleUpload}
        img={cropDialog.value ? URL.createObjectURL(cropDialog.value) : undefined}
        open={cropDialog.open}
        onClose={cropDialog.onClose}
      />
    </>
  );
};

PhotoField.propTypes = Props;

export default PhotoField;
