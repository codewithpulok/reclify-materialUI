import { useFormContext } from 'react-hook-form';

import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { RHFUploadAvatar } from 'src/components/common/hook-form';
import { useFilesUploadMutation } from 'src/redux-toolkit/services/uploadFilesApi';

const Props = {
  sx: PropTypes.object,
};
const fieldName = 'avatar';

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const AvatarFields = (props) => {
  const { sx } = props;
  const { setValue } = useFormContext();
  const [uploadFile, uploadResults] = useFilesUploadMutation();

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
      enqueueSnackbar('Error in uploading avatar', { variant: 'error' });
      console.error('Error in uploading avatar:', response);
      handleError(tempFile.preview);
    }

    // handle success state
    else if (data?.success && data?.results?.[0]?.link) {
      enqueueSnackbar('Avatar uploaded');
      console.warn('Avatar uploaded', response);
      handleSuccess(data.results[0].link, tempFile.preview);
    }
  };

  return (
    <RHFUploadAvatar
      name="avatar"
      maxSize={3145728}
      onDrop={handleDrop}
      sx={sx}
      disabled={uploadResults?.isLoading}
    />
  );
};

AvatarFields.propTypes = Props;

export default AvatarFields;
