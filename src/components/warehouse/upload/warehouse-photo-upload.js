import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Upload } from 'src/components/common/upload';
import { useBoolean } from 'src/hooks/use-boolean';
import { WarehousePhotoPreviewCard } from '../cards';
import { WarehousePhotoEditDialog } from '../dialog';

const WarehousePhotoUploadProps = {
  name: PropTypes.string.isRequired,
};

/**
 * @param {WarehousePhotoUploadProps} props
 * @returns {JSX.Element}
 */
const WarehousePhotoUpload = (props) => {
  const { name } = props;
  const { control } = useFormContext();
  const { fields, remove, append, update } = useFieldArray({ name, control });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const editDialog = useBoolean(false);

  // Photo upload functions
  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((newFile) => {
        /** @type {Photo} */
        const photoObj = {
          title: 'Untitled',
          coverUrl: URL.createObjectURL(newFile),
        };

        append(photoObj);
      });
    },
    [append]
  );

  // photo update functions
  const handleEdit = (photo) => {
    setSelectedPhoto(photo);
    editDialog.onTrue();
  };

  const handleEditCancel = () => {
    editDialog.onFalse();
    setSelectedPhoto(null);
  };

  const handleEditSubmit = useCallback(
    (photo) => {
      // find photo index if not found then abort update
      const photoIndex = fields.findIndex((field) => field.id === photo.id);

      if (photoIndex !== -1) update(photoIndex, photo);

      editDialog.onFalse();
      setSelectedPhoto(null);
    },
    [editDialog, fields, update]
  );

  return (
    <>
      <Upload multiple onDrop={handleDropMultiFile} />

      {/* uploaded images preview */}
      {fields ? (
        <>
          <Stack spacing={0.5} mt={2}>
            {fields.map((field, index) => (
              <WarehousePhotoPreviewCard
                key={field.id}
                photo={field}
                onDelete={() => remove(index)}
                onEdit={handleEdit}
              />
            ))}
          </Stack>

          <WarehousePhotoEditDialog
            open={editDialog.value}
            photo={selectedPhoto}
            onCancel={handleEditCancel}
            onSubmit={handleEditSubmit}
          />
        </>
      ) : null}
    </>
  );
};

WarehousePhotoUpload.propTypes = WarehousePhotoUploadProps;

export default WarehousePhotoUpload;
