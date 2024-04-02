'use client';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { View500 } from 'src/sections/error';

/**
 * @param {GlobalError.propTypes} props
 * @returns {JSX.Element}
 */
const GlobalError = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('GLOBAL ERROR: ', error);
  }, [error]);

  return <View500 />;
};

GlobalError.propTypes = {
  /** @type {@import('next/error').Error & {digest: string}} */
  error: PropTypes.object,
  /** @type {() => {}} */
  reset: PropTypes.func,
};

export default GlobalError;
