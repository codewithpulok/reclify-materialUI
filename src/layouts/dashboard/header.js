import PropTypes from 'prop-types';
// mui
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgBlur } from 'src/theme/css';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// components
import { getIconify } from 'src/components/common/iconify/utilities';
import Logo from 'src/components/common/logo';
import SvgColor from 'src/components/common/svg-color';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import AccountPopover from '../common/account-popover';
import NotificationsPopover from '../common/notifications-popover';
import Searchbar from '../common/searchbar';
import { HEADER, NAV } from '../config-layout';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const appearance = useAppearance();
  const isNavHorizontal = appearance.themeLayout === 'horizontal';
  const isNavMini = appearance.themeLayout === 'mini';

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
        <IconButton LinkComponent={RouterLink} href={paths.news.root}>
          <SvgColor src="/assets/icons/navbar/ic_blog.svg" />
        </IconButton>
        <NotificationsPopover />
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
