import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
// local components
import { PLACEHOLDER_PROFILE_AVATAR, PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

const Props = {
  avatarUrl: PropTypes.string,
  coverUrl: PropTypes.string,
  name: PropTypes.string,
  joined: PropTypes.string,
  avatarBottomSx: PropTypes.number,
};
/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const UserCover = (props) => {
  const { name, avatarUrl, joined, coverUrl, avatarBottomSx } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.8),
          imgUrl: coverUrl || PLACEHOLDER_PROFILE_BANNER,
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: avatarBottomSx || 60 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
        <Avatar
          src={avatarUrl || PLACEHOLDER_PROFILE_AVATAR}
          alt={name}
          sx={{
            mx: 'auto',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 2px ${theme.palette.common.white}`,
          }}
        />

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
    </Box>
  );
};

UserCover.propTypes = Props;
export default UserCover;
