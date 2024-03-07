'use client';

import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/common/loading-screen';

import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { paths } from 'src/routes/paths';
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
  const { isAuthenticated, user } = useAppSelector(selectAuth);

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const check = useCallback(() => {
    if (isAuthenticated) {
      // if user is seller and haven't complete the stripe account link then redirect to the refresh page
      if (user?.userType === 'seller' && user?.stripeAccountCompleteStatus === false) {
        router.replace(paths.auth.onboarding);
      }

      router.replace(returnTo);
    }
  }, [isAuthenticated, returnTo, router, user?.stripeAccountCompleteStatus, user?.userType]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
