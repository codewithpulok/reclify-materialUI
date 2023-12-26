import { useDispatch, useSelector, useStore } from 'react-redux';

/** @type {() => import('./store').AppDispatch} */
export const useAppDispatch = useDispatch;
/** @type {import('react-redux').TypedUseSelectorHook<import('./store').RootState>} */
export const useAppSelector = useSelector;
/** @type {() => import('./store').AppStore} */
export const useAppStore = useStore;
