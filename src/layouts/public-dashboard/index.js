'use client';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/common/settings';

import Loading from 'src/app/loading';
import { SnackbarProvider } from 'src/components/common/snackbar';
import Footer from '../main/footer';
import Header from './header';
import Main from './main';
import NavHorizontal from './nav-horizontal';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';

// ----------------------------------------------------------------------

export default function PublicDashboardLayout({ children }) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal =
    typeof settings?.themeLayout === 'string' ? settings.themeLayout === 'horizontal' : undefined;

  const isMini =
    typeof settings?.themeLayout === 'string' ? settings.themeLayout === 'mini' : undefined;

  const renderNavMini = <NavMini />;

  const renderHorizontal = <NavHorizontal />;

  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  if (isHorizontal) {
    return (
      <SnackbarProvider>
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}

        <Main>
          {children}
          <Footer sx={{ mt: 10 }} />
        </Main>
      </SnackbarProvider>
    );
  }

  if (isMini) {
    return (
      <SnackbarProvider>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          <Main>
            {children}
            <Footer sx={{ mt: 10 }} />
          </Main>
        </Box>
      </SnackbarProvider>
    );
  }

  if (isHorizontal === false && isMini === false) {
    return (
      <SnackbarProvider>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {renderNavVertical}

          <Main>
            {children}
            <Footer sx={{ mt: 10 }} />
          </Main>
        </Box>
      </SnackbarProvider>
    );
  }

  return <Loading />;
}

PublicDashboardLayout.propTypes = {
  children: PropTypes.node,
};
