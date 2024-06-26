import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import Iconify from '../iconify';
import Image from '../image';
import RejectionFiles from './errors-rejection-files';

// ----------------------------------------------------------------------

const Props = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.object,
  sx: PropTypes.object,
  onDelete: PropTypes.func,
  isLoading: PropTypes.bool,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function UploadAvatar(props) {
  const { error, file, disabled, helperText, sx, onDelete, isLoading, ...other } = props;
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    disabled,
    accept: {
      'image/*': [],
    },
    ...other,
  });

  // app states
  const hasFile = !!file;
  const hasError = isDragReject || !!error;
  const imgUrl = typeof file === 'string' ? file : file?.preview;

  // renders
  const renderRemove = hasFile && onDelete && (
    <Tooltip content="Click to remove">
      <IconButton
        size="small"
        onClick={(e) => onDelete(e, file)}
        sx={{
          top: 0,
          right: 0,
          zIndex: 9,
          position: 'absolute',
          color: (theme) => alpha(theme.palette.common.white, 0.8),
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
          },
        }}
      >
        <Iconify icon="mingcute:close-line" width={18} />
      </IconButton>
    </Tooltip>
  );

  const renderPreview = hasFile && (
    <Image
      alt="avatar"
      src={imgUrl}
      sx={{
        width: 1,
        height: 1,
        borderRadius: '50%',
      }}
    />
  );

  const renderPlaceholder = !isLoading && (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1}
      className="upload-placeholder"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        borderRadius: '50%',
        position: 'absolute',
        color: 'text.disabled',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
        '&:hover': {
          opacity: 0.72,
        },
        ...(hasError && {
          color: 'error.main',
          bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
        }),
        ...(hasFile && {
          zIndex: 9,
          opacity: 0,
          color: 'common.white',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.64),
        }),
      }}
    >
      <Iconify icon="solar:camera-add-bold" width={32} />

      <Typography variant="caption">{file ? 'Update photo' : 'Upload photo'}</Typography>
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
        borderRadius: '50%',
        position: 'relative',
      }}
    >
      {renderPreview}
      {renderPlaceholder}
    </Box>
  );

  const renderLoading = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        top: 0,
        left: 0,
        zIndex: 10,
        borderRadius: '50%',
        position: 'absolute',
        color: 'text.disabled',
      }}
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="inherit" />
    </Stack>
  );

  return (
    <Box position="relative">
      <Box
        {...getRootProps()}
        sx={{
          p: 1,
          m: 'auto',
          width: 144,
          height: 144,
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: '50%',
          border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            borderColor: 'error.main',
          }),
          ...(hasFile && {
            ...(hasError && {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            }),
            '&:hover .upload-placeholder': {
              opacity: 1,
            },
          }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />

        {renderContent}
        {isLoading && renderLoading}
      </Box>

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />
      {renderRemove}
    </Box>
  );
}

UploadAvatar.propTypes = Props;
