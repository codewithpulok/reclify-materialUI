import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/common/logo';
import { useSettingsContext } from 'src/components/common/settings';
import SvgColor from 'src/components/common/svg-color';

import { getIconify } from 'src/components/common/iconify/utilities';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import AccountPopover from '../common/account-popover';
import NotificationsPopover from '../common/notifications-popover';
import Searchbar from '../common/searchbar';
import { HEADER, NAV } from '../config-layout';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const isNavHorizontal = settings.themeLayout === 'horizontal';
  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');
  const offset = useOffSetTop(HEADER.H_DESKTOP);
  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}
      <Searchbar basePath={paths.dashboard.search.root} />
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <NotificationsPopover />
        <IconButton LinkComponent={RouterLink} href={paths.news.root}>
          {getIconify('iconamoon:news-duotone', 24)}
        </IconButton>
        <IconButton LinkComponent={RouterLink} href={paths.settings.root}>
          {getIconify('solar:settings-bold-duotone', 24)}
        </IconButton>
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
