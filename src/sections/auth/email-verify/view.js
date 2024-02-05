'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { ErrorState, LoadingState } from 'src/components/common/custom-state';
import { useEmailVerifyMutation } from 'src/redux-toolkit/services/authApi';
import MailSuccess from '../common/mail-success';
import VerifyForm from './verify-form';

// ----------------------------------------------------------------------

export default function EmailVerifyView() {
  // url states
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // app states
  const [verifyEmail, verfiyResponse] = useEmailVerifyMutation();

  // call verify mail on token change
  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return <VerifyForm />;
  }

  if (!verfiyResponse.isLoading && (verfiyResponse.isError || verfiyResponse?.data?.isError)) {
    return <ErrorState text="Could not verify" />;
  }

  if (!verfiyResponse.isLoading && verfiyResponse?.data?.success) {
    return <MailSuccess title="Email Verified" />;
  }

  return <LoadingState />;
}
