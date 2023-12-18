import { useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MultiFilePreview, Upload } from 'src/components/upload';

const WarehouseCreatePhotos = (props) => {
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({ name: 'photos', control });
  const [files, setFiles] = useState([]);

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
      {fields ? (
        <MultiFilePreview
          thumbnail
          files={fields.map((field, index) => ({ preview: field.coverUrl, key: index }))}
          onRemove={(field) => remove(field.key)}
        />
      ) : null}
    </>
  );
};

WarehouseCreatePhotos.propTypes = {};

export default WarehouseCreatePhotos;
