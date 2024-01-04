import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/common/logo';

import Link from 'next/link';
import { paths } from 'src/routes/paths';
import HeaderShadow from '../common/header-shadow';
import LoginButton from '../common/login-button';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavDesktop from './nav/desktop';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfig} />}

          <Stack
            alignItems="center"
            direction={{
              xs: 'row-reverse',
            }}
          >
            <Button LinkComponent={Link} href={paths.faqs} variant="contained" color="primary">
              Contact Us
            </Button>

            <LoginButton />

            {/* {!mdUp && <NavMobile data={navConfig} />} */}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
