import { Box, Button, IconButton, Stack, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Image } from 'src/components/image';
import { ICONS } from '../config-warehouse';

const NoImages = () => (
  <Stack
    sx={{
      mt: 3,
      width: 1,
      height: 200,
      borderRadius: 2,
      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      border: (theme) => `dashed 1px ${theme.palette.divider}`,
    }}
    alignItems="center"
    justifyContent="center"
    color="GrayText"
    spacing={1}
  >
    {ICONS.noImages}
    <Typography variant="body2">No Images</Typography>
  </Stack>
);

const UploadPreview = ({ src, onClose }) => (
  <Box sx={{ width: '150px', position: 'relative' }}>
    <Image src={src} ratio="16/9" />
    <IconButton
      onClick={onClose}
      sx={{
        position: 'absolute',
        top: 4,
        right: 4,
        color: 'white',
        bgcolor: 'rgba(0,0,0,0.5)',
        padding: '2px',
        display: 'flex',
        ':hover': {
          bgcolor: 'rgba(0,0,0,0.8)',
        },
      }}
      size="small"
    >
      {ICONS.close}
    </IconButton>
  </Box>
);
UploadPreview.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function UploadPhotos() {
  const { control } = useFormContext();
  const { fields, remove, prepend } = useFieldArray({ control, name: 'photos' });

  // remove photo from the uploads array
  const handleRemove = (index) => {
    remove(index);
  };

  // handle image upload
  const onImageUpload = (e) => {
    const { files } = e.target;
    // if there was no file then stop execution
    if (!files) return;

    // converting files to an array of files
    const fileList = [...files];
    fileList.forEach((file) => {
      prepend({ title: 'Untitled', coverUrl: URL.createObjectURL(file) });
    });
  };

  return (
    <Box my={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1">Warehouse Photos</Typography>

        <Button component="label" variant="outlined" startIcon={ICONS.upload}>
          Upload file
          <input
            style={{ display: 'none' }}
            accept="image/*"
            type="file"
            onChange={onImageUpload}
            multiple
          />
        </Button>
      </Stack>

      {fields.length ? (
        <Stack direction="row" flexWrap="wrap" spacing={1}>
          {fields.map((image, index) => (
            <UploadPreview
              src={image.coverUrl}
              key={image.id}
              onClose={() => handleRemove(index)}
            />
          ))}
        </Stack>
      ) : (
        <NoImages />
      )}
    </Box>
  );
}
