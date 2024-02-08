import { m } from 'framer-motion';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { MotionViewport, varFade } from 'src/components/common/animate';
import { RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useCreateContactMutation } from 'src/redux-toolkit/services/contactApi';

// ----------------------------------------------------------------------

export const ContactFormDescription = () => (
  <Stack spacing={1}>
    <Typography>
      {`Whether you're taking the first steps toward listing your services or embarking on a
          search for the ideal warehousing space, Racklify is your partner in navigating the
          logistics landscape.`}
    </Typography>
    <Typography>
      {`We welcome your inquiries and are eager to assist you here at Racklify. Whether you're a
          warehouse or service provider seeking to join our esteemed platform or an individual in
          search of warehouse space, our team is ready to provide the support you need.`}
    </Typography>
    <Typography>
      Feel free to reach out if you have questions, require guidance, or simply want to explore the
      possibilities of being listed on our site.{' '}
    </Typography>
    <Typography>
      Your satisfaction is our priority, and we look forward to connecting with you.
    </Typography>
  </Stack>
);

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
      <Stack component={MotionViewport} spacing={5}>
        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <RHFTextField {...textFieldProps} name="name" fullWidth label="Name" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField {...textFieldProps} name="email" fullWidth label="Email" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField {...textFieldProps} name="subject" fullWidth label="Subject" />
          </m.div>

          <m.div variants={varFade().inUp}>
            <RHFTextField
              {...textFieldProps}
              name="message"
              fullWidth
              label="Enter your message here."
              multiline
              rows={4}
            />
          </m.div>

          {!createResponse.isLoading && (createResponse.isSuccess || createResponse.isError) && (
            <Alert variant="filled" severity={createResponse.isSuccess ? 'success' : 'error'}>
              <AlertTitle>
                {createResponse.isSuccess && 'Your Message Sent'}
                {createResponse.isError && 'Error in sending message'}
              </AlertTitle>
            </Alert>
          )}
        </Stack>

        <m.div variants={varFade().inUp}>
          <LoadingButton
            loading={createResponse.isLoading}
            size="large"
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Now
          </LoadingButton>
        </m.div>
      </Stack>
    </FormProvider>
  );
}

ContactForm.propTypes = Props;
