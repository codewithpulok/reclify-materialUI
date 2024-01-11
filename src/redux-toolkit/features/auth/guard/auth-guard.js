'use client';

import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { SplashScreen } from 'src/components/common/loading-screen';

import { useAppSelector } from 'src/redux-toolkit/hooks';
import { selectAuth } from '../authSlice';

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { isLoading } = useAppSelector(selectAuth);

  return isLoading ? <SplashScreen /> : <Container>{children}</Container>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${paths.auth.login}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
