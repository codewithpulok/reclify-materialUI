'use client';

import { Toolbar, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import HeaderShadow from 'src/layouts/common/header-shadow';
import { HEADER } from 'src/layouts/config-layout';
import { bgBlur } from 'src/theme/css';

/**
 * @param {HeaderContainer.propTypes} props
 * @returns {JSX.Element}
 */
const HeaderContainer = (props) => {
  const { children } = props;
  const theme = useTheme();
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);
  return (
    <>
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
        {children}
      </Toolbar>
      {offsetTop && <HeaderShadow />}
    </>
  );
};

HeaderContainer.propTypes = {
  children: PropTypes.node,
};

export default HeaderContainer;
