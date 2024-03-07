'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Provider for date adapter
 * @param {DateProvider.propTypes} props
 * @returns {React.JSX}
 */
const DateProvider = (props) => {
  const { children } = props;

  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
};

DateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DateProvider;
