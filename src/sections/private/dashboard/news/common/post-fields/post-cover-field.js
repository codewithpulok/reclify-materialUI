import { enqueueSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFUpload } from 'src/components/common/hook-form';
import { useFilesUploadMutation } from 'src/redux-toolkit/services/uploadFilesApi';

const fieldName = 'coverUrl';

const PostCoverField = (props) => {
  // api state
  const [uploadFile, uploadResults] = useFilesUploadMutation();
  // const [deleteFile] = useFileDeleteMutation(); //TODO: we need a api to delete file by url

  // form state
  const methods = useFormContext();
  const { setValue } = methods;

  // handle file preview state
  const handlePreview = (file) => {
    const newFile = {
      file,
      preview: URL.createObjectURL(file),
    };

    setValue(fieldName, newFile.preview, { shouldValidate: false });

    return newFile;
  };

  // upload api success handler
  const handleSuccess = (newUrl, tempUrl) => {
    URL.revokeObjectURL(tempUrl);
    setValue(fieldName, newUrl, { shouldValidate: true });
  };
  // upload api error handler
  const handleError = (tempUrl) => {
    URL.revokeObjectURL(tempUrl);
    setValue(fieldName, null, { shouldValidate: true });
  };

  // file drop handler
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
      enqueueSnackbar('Error in uploading cover', { variant: 'error' });
      console.error('Error in uploading cover:', response);
      handleError(tempFile.preview);
    }

    // handle success state
    else if (data?.success && data?.results?.[0]?.link) {
      enqueueSnackbar('Cover uploaded');
      console.warn('Cover uploaded', response);
      handleSuccess(data.results[0].link, tempFile.preview);
    }
  };

  // handle cover remove
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

  return (
    <RHFUpload
      name="coverUrl"
      maxSize={3145728}
      onDrop={handleDrop}
      onDelete={handleRemove}
      disabled={uploadResults.isLoading}
    />
  );
};

PostCoverField.propTypes = {};

export default PostCoverField;
