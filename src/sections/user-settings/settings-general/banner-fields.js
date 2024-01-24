import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
// local components
import { IconButton } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { bgGradient } from 'src/theme/css';
import { ICONS } from '../config-settings';
import AvatarFields from './avatar-fields';

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
  joined: PropTypes.string,
};
/**
 * @param {Props} param0
 * @returns {JSX.Element}
 */
const BannerFields = (props) => {
  const { joined } = props;
  const { setValue, watch } = useFormContext();

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const name = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);

  const bannerUrl = watch('banner');
  const handleBannerUpdate = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const preview = URL.createObjectURL(file);

      if (file) {
        setValue('cover', preview, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Box sx={bannerContainerSx(bannerUrl)}>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={bannerContentSx}>
        <AvatarFields sx={bannerAvatarSx} />

        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={name}
          secondary={joined}
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
      </Stack>

      <IconButton component="label" sx={{ position: 'absolute', top: 10, right: 10 }}>
        {ICONS.cover_edit()}
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => handleBannerUpdate(e.target.files)}
        />
      </IconButton>
    </Box>
  );
};

BannerFields.propTypes = Props;
export default BannerFields;
