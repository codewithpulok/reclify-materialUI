import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { hideScroll } from 'src/theme/css';

import Logo from 'src/components/common/logo';
import { NavSectionMini } from 'src/components/common/nav-section';

import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
import NavToggleButton from '../common/nav-toggle-button';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useAppSelector(selectAuth);

  const navData = useNavData();

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} href={paths.dashboard.root} />

        <NavSectionMini
          data={navData}
          slotProps={{
            currentRole: user?.userType,
          }}
        />
      </Stack>
    </Box>
  );
}
