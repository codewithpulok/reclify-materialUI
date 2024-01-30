import { createSlice } from '@reduxjs/toolkit';

/** @type {AppearanceType} */
export const initialState = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'vertical',
  themeColorPresets: 'default',
  themeStretch: false,
};

export const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    updateAppearance: (state, actions) => {
      if (actions.payload.themeMode) state.themeMode = actions.payload.themeMode;
      if (actions.payload.themeDirection) state.themeDirection = actions.payload.themeDirection;
      if (actions.payload.themeContrast) state.themeContrast = actions.payload.themeContrast;
      if (actions.payload.themeLayout) state.themeLayout = actions.payload.themeLayout;
      if (actions.payload.themeColorPresets)
        state.themeColorPresets = actions.payload.themeColorPresets;
      if (actions.payload.themeStretch) state.themeStretch = actions.payload.themeStretch;
    },
  },
});

export const { updateAppearance } = appearanceSlice.actions;

/**
 * Select auth state
 * @param {import('src/redux-toolkit/store').RootState} state
 * @returns {AppearanceType}
 */
export const selectAppearance = (state) => state.auth;
