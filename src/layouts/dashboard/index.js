'use client';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useSettingsContext } from 'src/components/settings';

import { SnackbarProvider } from 'notistack';
import { Toast } from 'src/components/common/toast';
import Header from './header';
import Main from './main';
import NavHorizontal from './nav-horizontal';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';

// ----------------------------------------------------------------------

const toastComponents = {
  default: Toast,
  error: Toast,
  success: Toast,
  warning: Toast,
  info: Toast,
};

export default function DashboardLayout({ children }) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const nav = useBoolean();

  const isHorizontal = settings.themeLayout === 'horizontal';

  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini />;

  const renderHorizontal = <NavHorizontal />;

  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  if (isHorizontal) {
    return (
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        Components={toastComponents}
      >
        <Header onOpenNav={nav.onTrue} />

        {lgUp ? renderHorizontal : renderNavVertical}

        <Main>{children}</Main>
      </SnackbarProvider>
    );
  }

  if (isMini) {
    return (
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        Components={toastComponents}
      >
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </SnackbarProvider>
    );
  }

  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      Components={toastComponents}
    >
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </SnackbarProvider>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
