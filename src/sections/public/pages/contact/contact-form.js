'use client';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { MotionDiv, MotionViewport, varFade } from 'src/components/common/animate';
import { RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useCreateContactMutation } from 'src/redux-toolkit/services/contactApi';

// ----------------------------------------------------------------------

const defaultValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Props = {
  /** @type {import('@mui/material').TextFieldProps} */
  textFieldProps: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function ContactForm(props) {
  const { textFieldProps = {} } = props;

  // api state
  const [createContact, createResponse] = useCreateContactMutation();

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    console.log('Create contact:', values);

    const response = await createContact(values);
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      console.log('Error in creating contact:', response);
    }

    // success state
    else if (data?.success) {
      console.log('Contact created:', response);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack component={MotionViewport} spacing={5} sx={{ scrollMarginTop: '100px' }}>
        <Stack spacing={3}>
          <MotionDiv variants={varFade().inUp}>
            <RHFTextField {...textFieldProps} name="name" fullWidth label="Name" />
          </MotionDiv>

          <MotionDiv variants={varFade().inUp}>
            <RHFTextField {...textFieldProps} name="email" fullWidth label="Email" />
          </MotionDiv>

          <MotionDiv variants={varFade().inUp}>
            <RHFTextField {...textFieldProps} name="subject" fullWidth label="Subject" />
          </MotionDiv>

          <MotionDiv variants={varFade().inUp}>
            <RHFTextField
              {...textFieldProps}
              name="message"
              fullWidth
              label="Enter your message here."
              multiline
              rows={4}
            />
          </MotionDiv>

          {!createResponse.isLoading && (createResponse.isSuccess || createResponse.isError) && (
            <Alert variant="filled" severity={createResponse.isSuccess ? 'success' : 'error'}>
              <AlertTitle>
                {createResponse.isSuccess && 'Your Message Sent'}
                {createResponse.isError && 'Error in sending message'}
              </AlertTitle>
            </Alert>
          )}
        </Stack>

        <MotionDiv variants={varFade().inUp}>
          <LoadingButton
            loading={createResponse.isLoading}
            size="large"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Now
          </LoadingButton>
        </MotionDiv>
      </Stack>
    </FormProvider>
  );
}

ContactForm.propTypes = Props;
