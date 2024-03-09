'use client';

import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { SplashScreen } from 'src/components/common/loading-screen';

import { useAppSelector } from 'src/redux-toolkit/hooks';
import { selectAuth } from '../authSlice';

// ----------------------------------------------------------------------

export default function AuthGuard(props) {
  const { children, ignoreStripeCompleteStatus = false } = props;
  const { isLoading } = useAppSelector(selectAuth);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <Container ignoreStripeCompleteStatus={ignoreStripeCompleteStatus}>{children}</Container>
  );
}

AuthGuard.propTypes = {
  children: PropTypes.node,
  ignoreStripeCompleteStatus: PropTypes.bool,
};

// ----------------------------------------------------------------------

function Container(props) {
  const { children, ignoreStripeCompleteStatus } = props;
  const { isAuthenticated, user } = useAppSelector(selectAuth);
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
      // if user is seller and haven't complete the stripe account link then redirect to the refresh page
      if (
        user?.userType === 'seller' &&
        user?.stripeAccountStatus !== 'SUCCEDED' &&
        !ignoreStripeCompleteStatus
      ) {
        router.replace(paths.auth.onboarding);
        return;
      }
      setChecked(true);
    }
  }, [
    ignoreStripeCompleteStatus,
    isAuthenticated,
    router,
    user?.stripeAccountStatus,
    user?.userType,
  ]);

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
  ignoreStripeCompleteStatus: PropTypes.bool,
};
