import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';

import { enqueueSnackbar } from 'notistack';

import { CardActions, CardContent, CardHeader } from '@mui/material';
import FormProvider from 'src/components/common/hook-form';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useUpdatePasswordMutation } from 'src/redux-toolkit/services/authApi';
import Fields from './fields';

const defaultValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const Schema = Yup.object().shape({
  currentPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .min(6, 'Password must be at least 6 characters')
    .test(
      'no-match',
      'New password must be different than old password',
      (value, { parent }) => value !== parent.currentPassword
    ),
  confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

// ----------------------------------------------------------------------

const ResetPassword = () => {
  // auth state
  const { user } = useAppSelector(selectAuth);

  // api state
  const [updatePassword] = useUpdatePasswordMutation();

  // form state
  const methods = useForm({ resolver: yupResolver(Schema), defaultValues });
  const { reset, handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = async (values) => {
    const response = await updatePassword({ ...values, email: user?.email });
    const { data, error } = response;

    // handle success state
    if (error || data?.isError) {
      console.error('Error in changing password:', response);
      enqueueSnackbar('Error in changing password!', { variant: 'error' });
    }

    // handle success state
    else if (data?.success) {
      console.error('Password changed:', response);
      enqueueSnackbar('Password changed!');

      reset(); // reset form if success
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Reset your password" />
        <CardContent>
          <Fields />
        </CardContent>
        <CardActions>
          <LoadingButton
            type="submit"
            variant="contained"
            color="success"
            loading={isSubmitting}
            sx={{ ml: 'auto' }}
          >
            Save Changes
          </LoadingButton>
        </CardActions>
      </Card>
    </FormProvider>
  );
};

export default ResetPassword;
