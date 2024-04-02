'use client';

import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

const useAuthPath = (authPath, fallbackPath) => {
  const { isAuthenticated } = useAppSelector(selectAuth);

  if (isAuthenticated) return authPath;

  return fallbackPath;
};

export default useAuthPath;
