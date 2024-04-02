'use client';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { View500 } from 'src/sections/error';

/**
 * @param {Error.propTypes} props
 * @returns {JSX.Element}
 */
const Error = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('ROOT ERROR: ', error);
  }, [error]);

  return <View500 />;
};

Error.propTypes = {
  /** @type {@import('next/error').Error & {digest: string}} */
  error: PropTypes.object,
  /** @type {() => {}} */
  reset: PropTypes.func,
};

export default Error;
