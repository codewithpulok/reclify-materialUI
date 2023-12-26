'use client';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { makeStore } from './store';

const ProviderProps = {
  children: PropTypes.node.isRequired,
};
/**
 * Provider for redux toolkit
 * @param {ProviderProps} props
 * @returns {React.JSX}
 */
const Provider = (props) => {
  const { children } = props;
  const storeRef = useRef();

  if (!storeRef.current) storeRef.current = makeStore();

  return <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>;
};

Provider.propTypes = ProviderProps;

export default Provider;
