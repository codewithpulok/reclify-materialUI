import { LoadingButton } from '@mui/lab';
import { Card, CardActions, CardContent, CardHeader, MenuItem, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ChangeServiceTypeDialog } from 'src/components/common/custom-dialog';
import { RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { serviceTypes } from 'src/constant/service-types';
import { useDialog } from 'src/hooks/use-dialog';

/**
 * @param {AdminControl.propTypes} props
 * @returns {JSX.Element}
 */
const AdminControl = (props) => {
  const { user } = props;

  // dialgo state
  const serviceDialog = useDialog();

  // default state
  const defaultValues = useMemo(
    () => ({
      serviceType: user?.serviceType || '',
    }),
    [user?.serviceType]
  );

  // form states
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, formState, watch } = methods;
  const { isSubmitting } = formState;
  const serviceType = watch('serviceType');

  const onSubmit = (values) => {
    console.log('Admin Control:', values);
    serviceDialog.onOpen(values?.serviceType);
  };

  // update default state
  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <>
      <Card>
        <CardHeader title="Admin Control" />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CardContent component={Stack} spacing={1}>
            <RHFTextField name="serviceType" label="Service Type" select>
              {serviceTypes.map((service) => (
                <MenuItem key={service.value} value={service.value}>
                  {service.label}
                </MenuItem>
              ))}
            </RHFTextField>
            <CardActions sx={{ justifyContent: 'end' }}>
              <LoadingButton
                loading={isSubmitting}
                disabled={user?.serviceType === serviceType}
                type="submit"
                variant="contained"
                color="primary"
              >
                Update
              </LoadingButton>
            </CardActions>
          </CardContent>
        </FormProvider>
      </Card>
      <ChangeServiceTypeDialog
        open={serviceDialog.open}
        onClose={serviceDialog.onClose}
        id={user?.id}
        serviceType={serviceDialog.value}
      />
    </>
  );
};

AdminControl.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default AdminControl;
