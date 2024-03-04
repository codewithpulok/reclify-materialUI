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
import SvgColor from 'src/components/common/svg-color';

import { Button } from '@mui/material';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import LoginButton from '../common/login-button';
import Searchbar from '../common/searchbar';
import { HEADER, NAV } from '../config-layout';
import { navConfig } from '../main/config-navigation';
import NavMobile from '../main/nav/mobile';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const appearance = useAppearance();
  const isNavHorizontal = appearance.themeLayout === 'horizontal';
  const isNavMini = appearance.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');
  const mdUp = useResponsive('up', 'md');
  const mdDown = useResponsive('down', 'md');
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
      <Searchbar basePath={paths.search.root} />
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <Stack alignItems="center" direction="row" gap={0.5}>
          {mdUp && (
            <>
              <Button
                LinkComponent={RouterLink}
                href={paths.news.root}
                variant="outlined"
                color="primary"
              >
                Racklify News
              </Button>
              <Button
                LinkComponent={RouterLink}
                href={paths.contact_us}
                variant="outlined"
                color="primary"
              >
                Contact Us
              </Button>
            </>
          )}
          <LoginButton />
        </Stack>
        {mdDown && <NavMobile data={navConfig} />}
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
