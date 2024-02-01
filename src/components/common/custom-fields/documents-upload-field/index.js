'use client';

import { Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Upload } from 'src/components/common/upload';
import {
  useFileDeleteMutation,
  useFilesUploadMutation,
} from 'src/redux-toolkit/services/uploadFilesApi';
import DocumentsPreviewList from './preview-list';

const Props = {
  name: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DocumentsUploadField = (props) => {
  const { name } = props;
  const [uploadFiles, { isLoading }] = useFilesUploadMutation();
  const [deleteFile] = useFileDeleteMutation();

  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({ name, control, keyName: '_id' });

  // insert documents
  const insertDocuments = (files = []) => {
    files.forEach((file) => {
      /**  @type {Photo} */
      const obj = {
        id: file.id,
        title: 'Untitled',
        link: file.link,
      };

      append(obj);
    });
  };

  // remove document
  const removeDocument = useCallback(
    async (image) => {
      const response = await deleteFile(image.id);
      const { error, data } = response;

      // handle error state
      if (error || data.isError) {
        console.error('Document Delete Error:', error || data);
        enqueueSnackbar('Error in deleting Document', { variant: 'error' });
      }

      // handle success state
      else if (data && data?.success) {
        console.log('Document Deleted Successfully: ', response);
        enqueueSnackbar('Document Deleted successfully');
        remove(fields.findIndex((f) => f._id === image._id));
      }
    },
    [deleteFile, fields, remove]
  );

  // documents upload functions
  const handleDropMultiFile = async (acceptedFiles) => {
    console.warn('Warehouse Documents upload: ', acceptedFiles);

    const response = await uploadFiles(acceptedFiles);
    const { data, error } = response;

    // handle error state
    if (error || data.isError) {
      console.error('Documents upload Error:', error || data);
      enqueueSnackbar('Error in uploading Documents', { variant: 'error' });
    }

    // handle success state
    else if (data && data?.success) {
      console.log('Documents Uploaded Successfully: ', response);
      enqueueSnackbar('Documents uploaded successfully');
      insertDocuments(data.results); // insert documents
    }
  };

  return (
    <>
      <Upload multiple onDrop={handleDropMultiFile} disabled={isLoading} />

      <Stack spacing={0.5} mt={2} mb={2}>
        <DocumentsPreviewList onDelete={removeDocument} documents={fields} isLoading={isLoading} />
      </Stack>
    </>
  );
};

DocumentsUploadField.propTypes = Props;

export default DocumentsUploadField;
