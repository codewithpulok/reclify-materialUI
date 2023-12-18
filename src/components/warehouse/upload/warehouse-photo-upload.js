import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Upload } from 'src/components/upload';
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

  const [files, setFiles] = useState([]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const editDialog = useBoolean(false);

  // Photo upload functions
  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleOnUpload = useCallback(() => {
    files.forEach((file) => append({ coverUrl: file.preview, title: 'Untitled' }));
    setFiles([]);
  }, [append, files]);

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
      <Upload
        multiple
        thumbnail
        preview
        files={files}
        onDrop={handleDropMultiFile}
        onRemove={handleRemoveFile}
        onRemoveAll={handleRemoveAllFiles}
        onUpload={handleOnUpload}
      />

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
