import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
// local components
import { Card } from '@mui/material';
import { PLACEHOLDER_PROFILE_AVATAR, PLACEHOLDER_PROFILE_BANNER } from 'src/config-global';
import { bgGradient } from 'src/theme/css';
import { common, primary } from 'src/theme/palette';
import { alpha } from 'src/utils/color';
import { fDate } from 'src/utils/format-time';
import MessageBtn from './message-btn';
import UserTabs from './user-tabs';

// ----------------------------------------------------------------------

/**
 * @param {UserCover.propTypes} props
 * @returns {JSX.Element}
 */
const UserCover = (props) => {
  const { avatarBottomSx, wrapperSx, avatarWrapperSx, avatarSx, user, tabs } = props;

  return (
    <Card sx={{ mb: 3, height: 290, ...wrapperSx }}>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(primary.darker, 0.8),
            imgUrl: user?.banner || PLACEHOLDER_PROFILE_BANNER,
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
            ...avatarWrapperSx,
          }}
        >
          <Avatar
            src={user?.avatar || PLACEHOLDER_PROFILE_AVATAR}
            alt={user?.firstName}
            sx={{
              mx: 'auto',
              width: { xs: 64, md: 128 },
              height: { xs: 64, md: 128 },
              border: `solid 2px ${common.white}`,
              ...avatarSx,
            }}
          />

          <ListItemText
            sx={{
              mt: 3,
              ml: { md: 3 },
              textAlign: { xs: 'center', md: 'unset' },
            }}
            primary={`${user?.firstName} ${user?.lastName}`}
            secondary={fDate(user.createdAt)}
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

      <Stack sx={{ width: 1, bottom: 0, zIndex: 9, position: 'absolute' }}>
        <MessageBtn user={user} />
        <UserTabs tabs={tabs} />
      </Stack>
    </Card>
  );
};

UserCover.propTypes = {
  /** @type {{value: string, icon: any, label: string}} */
  tabs: PropTypes.arrayOf(PropTypes.object),

  /** @type {User} */
  user: PropTypes.object,

  avatarBottomSx: PropTypes.number,

  /** @type {SxProps} */
  wrapperSx: PropTypes.object,
  /** @type {SxProps} */
  avatarWrapperSx: PropTypes.object,
  /** @type {SxProps} */
  avatarSx: PropTypes.object,
};
export default UserCover;
