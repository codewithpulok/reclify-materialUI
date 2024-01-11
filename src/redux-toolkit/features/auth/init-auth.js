'use client';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useInitAuthMutation } from 'src/redux-toolkit/services/authApi';

const Props = { children: PropTypes.node.isRequired };

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const InitAuth = (props) => {
  const { children } = props;
  const [initAuth] = useInitAuthMutation();

  useEffect(() => {
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

InitAuth.propTypes = Props;

export default InitAuth;
