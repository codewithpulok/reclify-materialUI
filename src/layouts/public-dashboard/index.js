'use client';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Loading from 'src/app/loading';
import { SnackbarProvider } from 'src/components/common/snackbar';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import Footer from '../main/footer';
import Header from './header';
import Main from './main';
import NavHorizontal from './nav-horizontal';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';

// ----------------------------------------------------------------------

export default function PublicDashboardLayout({ children }) {
  const appearance = useAppearance();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal =
    typeof appearance?.themeLayout === 'string'
      ? appearance.themeLayout === 'horizontal'
      : undefined;

  const isMini =
    typeof appearance?.themeLayout === 'string' ? appearance.themeLayout === 'mini' : undefined;

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
