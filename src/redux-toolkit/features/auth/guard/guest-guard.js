'use client';

import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/common/loading-screen';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { selectAuth } from '../authSlice';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isLoading } = useAppSelector(selectAuth);

  return isLoading ? <SplashScreen /> : <Container>{children}</Container>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const { isAuthenticated } = useAppSelector(selectAuth);

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(returnTo);
    }
  }, [isAuthenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
