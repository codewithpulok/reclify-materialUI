import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { RHFUpload } from 'src/components/common/hook-form';
import { useFilesUploadMutation } from 'src/redux-toolkit/services/uploadFilesApi';

const Props = {
  sx: PropTypes.object,
};
const fieldName = 'logo';

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const LogoField = (props) => {
  const { sx } = props;
  const { setValue } = useFormContext();
  const [uploadFile, uploadResults] = useFilesUploadMutation();
  // const [deleteFile] = useFileDeleteMutation(); //TODO: we need a api to delete file by url

  const handleRemove = useCallback(
    async (_image) => {
      // const response = await deleteFile(image.id);
      // const { error, data } = response;

      // // handle error state
      // if (error || data.isError) {
      //   console.error('Image Delete Error:', error || data);
      //   enqueueSnackbar('Error in deleting Images', { variant: 'error' });
      // }

      // // handle success state
      // else if (data && data?.success) {
      //   console.log('Image Deleted Successfully: ', response);
      //   enqueueSnackbar('Image Deleted successfully');
      // }
      setValue(fieldName, null);
    },
    [setValue]
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
    <Card sx={{ ...sx }}>
      <CardHeader title="Logo" />
      <CardContent>
        <RHFUpload
          name={fieldName}
          maxSize={3145728}
          onDrop={handleDrop}
          disabled={uploadResults?.isLoading}
          onDelete={handleRemove}
          placeholderIllustration={false}
        />
      </CardContent>
    </Card>
  );
};

LogoField.propTypes = Props;

export default LogoField;
