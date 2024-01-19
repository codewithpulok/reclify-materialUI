'use client';

import { Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Upload } from 'src/components/common/upload';
import { useDialog } from 'src/hooks/use-dialog';
import {
  useFileDeleteMutation,
  useFilesUploadMutation,
} from 'src/redux-toolkit/services/uploadFilesApi';
import { WarehousePhotoPreviewCard } from '../cards';
import { WarehousePhotoEditDialog } from '../dialog';

const Props = {
  name: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehousePhotoUpload = (props) => {
  const { name } = props;
  const [uploadFiles, { isLoading }] = useFilesUploadMutation();
  const [deleteFile] = useFileDeleteMutation();

  const { control } = useFormContext();
  const { fields, remove, append, update } = useFieldArray({ name, control, keyName: '_id' });
  const [tempBlob, setTempBlob] = useState([]);

  const photoDialog = useDialog();

  // insert file to temp blob
  const insertTempBlob = (files = []) => {
    setTempBlob((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };
  // clear the temp blob files
  const clearTempBlob = () => {
    setTempBlob((prev) => {
      prev.forEach((file) => URL.revokeObjectURL(file));
      return [];
    });
  };

  // insert images
  const insertImages = (files = []) => {
    files.forEach((file) => {
      /**
       * prepare photo object
       * @type {Photo}
       */
      const photoObj = {
        id: file.id,
        title: 'Untitled',
        link: file.link,
      };

      append(photoObj);
    });
  };
  // remove image
  const removeImage = useCallback(
    async (image) => {
      const response = await deleteFile(image.id);
      const { error, data } = response;

      // handle error state
      if (error || data.isError) {
        console.error('Image Delete Error:', error || data);
        enqueueSnackbar('Error in deleting Images', { variant: 'error' });
      }

      // handle success state
      else if (data && data.isSuccess) {
        console.log('Image Deleted Successfully: ', response);
        enqueueSnackbar('Image Deleted successfully');
        remove(fields.findIndex((f) => f._id === image._id));
      }
    },
    [deleteFile, fields, remove]
  );

  // open edit dialog
  const handleEdit = (photo) => {
    photoDialog.onOpen(photo);
  };
  // close edit dialog
  const handleEditCancel = () => {
    photoDialog.onClose();
  };
  // updated edited image
  const handleEditSubmit = useCallback(
    (photo) => {
      // find photo index if not found then abort update
      const photoIndex = fields.findIndex((field) => field.id === photo.id);

      if (photoIndex !== -1) update(photoIndex, photo);

      photoDialog.onClose();
    },
    [fields, photoDialog, update]
  );

  // Photo upload functions
  const handleDropMultiFile = async (acceptedFiles) => {
    console.warn('Warehouse Image upload: ', acceptedFiles);
    // enable loading state
    insertTempBlob(acceptedFiles);
    const response = await uploadFiles(acceptedFiles);
    const { data, error } = response;

    // handle error state
    if (error || data.isError) {
      console.error('Image upload Error:', error || data);
      enqueueSnackbar('Error in uploading Images', { variant: 'error' });
    }

    // handle success state
    else if (data && data.isSuccess) {
      console.log('Image Uploaded Successfully: ', response);
      enqueueSnackbar('Image uploaded successfully');
      insertImages(data.results); // insert images
    }

    // disable loading state
    clearTempBlob();
  };

  return (
    <>
      <Upload multiple onDrop={handleDropMultiFile} disabled={isLoading} />

      {/* uploaded images preview */}
      <Stack spacing={0.5} mt={2}>
        {fields.map((field, index) => (
          <WarehousePhotoPreviewCard
            key={field.id}
            photo={field}
            onDelete={removeImage}
            onEdit={handleEdit}
          />
        ))}

        {tempBlob.map((blob) => (
          <WarehousePhotoPreviewCard
            key={blob}
            photo={{ link: blob, title: 'Uploading' }}
            isLoading
          />
        ))}
      </Stack>

      <WarehousePhotoEditDialog
        open={photoDialog.open}
        photo={photoDialog.value}
        onCancel={handleEditCancel}
        onSubmit={handleEditSubmit}
      />
    </>
  );
};

WarehousePhotoUpload.propTypes = Props;

export default WarehousePhotoUpload;
