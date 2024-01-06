'use client';

import PropTypes from 'prop-types';

import Provider from 'src/redux-toolkit/provider';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <Provider>{children}</Provider>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
