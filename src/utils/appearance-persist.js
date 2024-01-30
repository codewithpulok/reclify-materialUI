import { APPEARANCE_KEY } from 'src/config-global';
// ----------------------------------------------------------------------

export const saveAppearanceState = (data) =>
  new Promise((resolve, reject) => {
    try {
      if (!data) throw new Error('Invalid appearance state value');

      localStorage.setItem(APPEARANCE_KEY, JSON.stringify(data));

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const getAppearanceState = () =>
  new Promise((resolve, reject) => {
    try {
      const appearanceString = localStorage.getItem(APPEARANCE_KEY);

      if (!appearanceString) throw new Error('Invalid appearance state');

      const appearance = JSON.parse(appearanceString);

      resolve(appearance);
    } catch (error) {
      reject(error);
    }
  });

export const updateAppearanceState = (key, value) =>
  new Promise((resolve, reject) => {
    try {
      const appearanceString = localStorage.getItem(APPEARANCE_KEY);

      const appearance = appearanceString ? JSON.parse(appearanceString) : {};

      appearance[key] = value;

      localStorage.setItem(APPEARANCE_KEY, JSON.stringify(appearance));

      resolve(appearance);
    } catch (error) {
      reject(error);
    }
  });
