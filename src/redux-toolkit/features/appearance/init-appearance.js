'use client';

import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/redux-toolkit/hooks';
import { getAppearanceState } from 'src/utils/appearance-persist';
import { updateAppearance } from './appearanceSlice';

const InitAppearance = (props) => {
  const dispatch = useAppDispatch();

  const getPersistState = useCallback(async () => {
    try {
      const state = await getAppearanceState();
      dispatch(updateAppearance(state));
    } catch (error) {
      console.log('Apperance:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    getPersistState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props?.children;
};

InitAppearance.propTypes = {
  children: PropTypes.node,
};

export default InitAppearance;
