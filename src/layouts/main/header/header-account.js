'use client';

import AccountPopover from 'src/layouts/common/account-popover';
import LoginButton from 'src/layouts/common/login-button';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

const HeaderAccount = (props) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  return isAuthenticated ? <AccountPopover /> : <LoginButton />;
};

HeaderAccount.propTypes = {};

export default HeaderAccount;
