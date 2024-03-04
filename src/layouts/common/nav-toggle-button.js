import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/common/iconify';

import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { NAV } from '../config-layout';

// ----------------------------------------------------------------------

export default function NavToggleButton({ sx, ...other }) {
  const theme = useTheme();

  const appearance = useAppearance();

  const lgUp = useResponsive('up', 'lg');

  if (!lgUp) {
    return null;
  }

  return (
    <IconButton
      size="small"
      onClick={() =>
        appearance.onUpdate(
          'themeLayout',
          appearance.themeLayout === 'vertical' ? 'mini' : 'vertical'
        )
      }
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',
        left: NAV.W_VERTICAL - 12,
        zIndex: theme.zIndex.appBar + 1,
        border: `dashed 1px ${theme.palette.divider}`,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={
          appearance.themeLayout === 'vertical'
            ? 'eva:arrow-ios-back-fill'
            : 'eva:arrow-ios-forward-fill'
        }
      />
    </IconButton>
  );
}

NavToggleButton.propTypes = {
  sx: PropTypes.object,
};
