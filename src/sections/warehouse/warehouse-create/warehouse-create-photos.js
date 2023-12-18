import { Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Upload } from 'src/components/upload';
import { WarehousePhotoPreviewCard } from 'src/components/warehouse/cards';
import { WarehousePhotoEditDialog } from 'src/components/warehouse/dialog';
import { useBoolean } from 'src/hooks/use-boolean';

const WarehouseCreatePhotos = (props) => {
  const { control } = useFormContext();
  const { fields, remove, append, update } = useFieldArray({ name: 'photos', control });

  const [files, setFiles] = useState([]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const editDialog = useBoolean(false);

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

  // photo edit functions

  const handleEdit = (photo) => {
    setSelectedPhoto(photo);
    editDialog.onTrue();
  };

  const handleEditCancel = () => {
    editDialog.onFalse();
    setSelectedPhoto(null);
  };

  const handleEditSubmit = useCallback(
    (photo, event) => {
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

WarehouseCreatePhotos.propTypes = {};

export default WarehouseCreatePhotos;
