// mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// redux
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
// components
import Label from 'src/components/common/label';
// constants
import { PLACEHOLDER_PROFILE_AVATAR } from 'src/config-global';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  const { user } = useAppSelector(selectAuth);

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={user?.avatar || PLACEHOLDER_PROFILE_AVATAR}
            alt={user?.firstName}
            sx={{ width: 48, height: 48 }}
          />

          <Label
            color="success"
            variant="filled"
            sx={{
              top: -6,
              px: 0.5,
              left: 40,
              height: 20,
              position: 'absolute',
              borderBottomLeftRadius: 2,
            }}
          >
            Free
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.email}
          </Typography>
        </Stack>

        <Button LinkComponent={RouterLink} variant="contained" href={paths.settings.billing}>
          Upgrade to Pro
        </Button>
      </Stack>
    </Stack>
  );
}
