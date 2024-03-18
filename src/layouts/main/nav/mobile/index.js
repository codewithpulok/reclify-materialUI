'use client';

import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';

import Logo from 'src/components/common/logo';
import Scrollbar from 'src/components/common/scrollbar';
import SvgColor from 'src/components/common/svg-color';

import NavList from './nav-list';

// ----------------------------------------------------------------------

/**
 * @param {NavMobile.propTypes} props
 * @returns {JSX.Element}
 */
export default function NavMobile(props) {
  const { data, actionSx, drawerSx } = props;

  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ ml: 1, ...actionSx }}>
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      <Drawer
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
        sx={drawerSx}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          {data.map((list) => (
            <NavList key={list.title} data={list} />
          ))}
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
  /** @type {SxProps} */
  actionSx: PropTypes.object,
  /** @type {SxProps} */
  drawerSx: PropTypes.object,
};
