import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
// local components
import { Card, IconButton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useFormContext } from 'react-hook-form';
import { PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { useFilesUploadMutation } from 'src/redux-toolkit/services/uploadFilesApi';
import { bgGradient } from 'src/theme/css';
import { ICONS } from '../config-fields';
import PhotoField from './photo';

// ----------------------------------------------------------------------

const bannerContainerSx = (coverUrl) => (theme) => ({
  ...bgGradient({
    color: alpha(theme.palette.primary.darker, 0.8),
    imgUrl: coverUrl,
  }),
  height: 1,
  color: 'common.white',
});
const bannerContentSx = {
  left: { md: 24 },
  bottom: { md: 24 },
  zIndex: { md: 10 },
  pt: { xs: 6, md: 0 },
  position: { md: 'absolute' },
};
const bannerAvatarSx = {
  mx: 'auto',
  width: { xs: 100, sm: 128 },
  height: { xs: 100, sm: 128 },
  border: (theme) => `solid 2px ${theme.palette.primary.main}`,
};

// ----------------------------------------------------------------------

const Props = {
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  photoLabel: PropTypes.string,
  photoName: PropTypes.string,
  bannerName: PropTypes.string,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const BannerField = (props) => {
  const { primaryText, secondaryText, bannerName, photoLabel, photoName } = props;

  // api state
  const [uploadFile, uploadResults] = useFilesUploadMutation();

  // form state
  const { setValue, watch } = useFormContext();

  const bannerUrl = watch(bannerName);

  const handlePreview = (file) => {
    const newFile = {
      file,
      preview: URL.createObjectURL(file),
    };

    setValue(bannerName, newFile.preview, { shouldValidate: false });

    return newFile;
  };

  const handleSuccess = (newUrl, tempUrl) => {
    URL.revokeObjectURL(tempUrl);
    setValue(bannerName, newUrl, { shouldValidate: true });
  };

  const handleError = (tempUrl) => {
    URL.revokeObjectURL(tempUrl);
    setValue(bannerName, null, { shouldValidate: true });
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
      enqueueSnackbar('Error in uploading banner', { variant: 'error' });
      console.error('Error in uploading banner:', response);
      handleError(tempFile.preview);
    }

    // handle success state
    else if (data?.success && data?.results?.[0]?.link) {
      enqueueSnackbar('Banner uploaded');
      console.warn('Banner uploaded', response);
      handleSuccess(data.results[0].link, tempFile.preview);
    }
  };

  return (
    <Card sx={{ height: 290 }}>
      <Box sx={bannerContainerSx(bannerUrl || PLACEHOLDER_PROFILE_BANNER)}>
        <Stack direction={{ xs: 'column', md: 'row' }} sx={bannerContentSx}>
          <PhotoField fieldName={photoName} label={photoLabel} sx={bannerAvatarSx} />

          {(!!primaryText || !!secondaryText) && (
            <ListItemText
              sx={{
                mt: 3,
                ml: { md: 3 },
                textAlign: { xs: 'center', md: 'unset' },
              }}
              primary={primaryText}
              secondary={secondaryText}
              primaryTypographyProps={{
                typography: 'h4',
              }}
              secondaryTypographyProps={{
                mt: 0.5,
                color: 'inherit',
                component: 'span',
                typography: 'body2',
                sx: { opacity: 0.48 },
              }}
            />
          )}
        </Stack>

        <IconButton
          disabled={uploadResults?.isLoading}
          component="label"
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          {uploadResults?.isLoading ? ICONS.uploading() : ICONS.cover_edit()}
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => handleDrop(e.target.files)}
            accept="image/*"
            multiple={false}
          />
        </IconButton>
      </Box>
    </Card>
  );
};

BannerField.propTypes = Props;
export default BannerField;
