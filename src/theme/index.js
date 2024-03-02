'use client';

import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// system
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
// options
import { customShadows } from './custom-shadows';
import { createContrast } from './options/contrast';
import { createPresets } from './options/presets';
import RTL from './options/right-to-left';
import { componentsOverrides } from './overrides';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const appearance = useAppearance();

  const presets = createPresets(appearance.themeColorPresets);

  const contrast = createContrast(appearance.themeContrast, appearance.themeMode);

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(appearance.themeMode),
        ...presets.palette,
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows(appearance.themeMode),
        ...presets.customShadows,
      },
      direction: appearance.themeDirection,
      shadows: shadows(appearance.themeMode),
      shape: { borderRadius: 8 },
      typography,
    }),
    [
      appearance.themeMode,
      appearance.themeDirection,
      presets.palette,
      presets.customShadows,
      contrast.palette,
    ]
  );

  const theme = createTheme(memoizedValue);

  theme.components = merge(componentsOverrides(theme), contrast.components);

  return (
    // <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <RTL themeDirection={appearance.themeDirection}>
          <CssBaseline />
          {children}
        </RTL>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
    // </NextAppDirEmotionCacheProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
