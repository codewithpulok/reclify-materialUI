'use client';

import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

const useAdminPath = (adminPath, fallbackPath) => {
  const { user } = useAppSelector(selectAuth);

  if (user?.userType === 'admin') return adminPath;

  return fallbackPath;
};

export default useAdminPath;
