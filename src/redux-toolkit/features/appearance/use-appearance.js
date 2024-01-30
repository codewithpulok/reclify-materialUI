import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux-toolkit/hooks';
import { updateAppearanceState } from 'src/utils/appearance-persist';
import { localStorageGetItem } from 'src/utils/storage-available';
import { selectAppearance, updateAppearance } from './appearanceSlice';

const useAppearance = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectAppearance);

  const isArabic = localStorageGetItem('i18nextLng') === 'ar';

  const changeThemeMode = useCallback(
    (mode) => {
      dispatch(updateAppearance({ themeMode: mode }));
      updateAppearanceState('themeMode', mode);
    },
    [dispatch]
  );

  const update = useCallback(
    (key, value) => {
      dispatch(updateAppearance({ [key]: value }));
      updateAppearanceState([key], value);
    },
    [dispatch]
  );

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang) => {
      dispatch(updateAppearance({ themeDirection: lang === 'ar' ? 'rtl' : 'ltr' }));
      updateAppearanceState('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
    },
    [dispatch]
  );

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // theme
      changeThemeMode,
      setDarkTheme: () => changeThemeMode('dark'),
      setLightTheme: () => changeThemeMode('light'),
      // Direction
      onChangeDirectionByLang,
    }),
    [state, update, changeThemeMode, onChangeDirectionByLang]
  );

  return memoizedValue;
};

export default useAppearance;
