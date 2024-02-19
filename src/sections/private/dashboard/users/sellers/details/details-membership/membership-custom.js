import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useUpgradePlanMutation } from 'src/redux-toolkit/services/adminApi';
import { usePlanGetQuery } from 'src/redux-toolkit/services/planApi';
import { restrictNegetiveValue } from 'src/utils/form';

// ----------------------------------------------------------------------
const Props = {
  userId: PropTypes.string,
};
/** @type {PlanId} */
const planId = 'enterprise';
const defaultValues = {
  price: null,
  features: [],
};

// ----------------------------------------------------------------------
const MembershipCustom = (props) => {
  const { userId } = props;

  // api state
  const planResponse = usePlanGetQuery(planId);
  const [upgradePlan] = useUpgradePlanMutation();

  // form state
  const methods = useForm({ defaultValues });
  const { handleSubmit, formState, watch, setValue } = methods;
  const { isSubmitting } = formState;
  const features = watch('features', []);

  // handle submit
  const onSubmit = async (formValues) => {
    console.log('Plan Upgrade: ', formValues);
    const response = await upgradePlan({ id: userId, data: formValues });
    const { data, error } = response;

    // error state
    if (error || data?.isError) {
      enqueueSnackbar('Error in upgrade plan', { variant: 'error' });
      console.error('Plan Upgrade Error:', response);
    }
    // success state
    else if (!error && data?.success) {
      enqueueSnackbar('Plan Upgraded');
      console.warn('Plan Upgraded:', response);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Customize Membership" />
        <CardContent>
          {(planResponse?.isLoading || planResponse?.isFetching) && <LoadingState />}
          {!planResponse?.isLoading && !planResponse?.isFetching && planResponse?.isError && (
            <ErrorState />
          )}
          {!planResponse?.isLoading && !planResponse?.isFetching && planResponse?.isSuccess && (
            <Stack spacing={1}>
              <RHFTextField
                name="price"
                type="number"
                label="Price"
                variant="filled"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChangeMiddleware={restrictNegetiveValue}
              />
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Features
                </Typography>
                <Stack>
                  {planResponse.data?.results?.features?.length ? (
                    planResponse.data.results.features.map((f, index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={features.includes(f)}
                            onChange={(_e, checked) => {
                              if (checked) {
                                const prev = [...features];
                                prev.push(f);
                                setValue(`features`, prev);
                              } else {
                                const filterd = [...features].filter((item) => item !== f);
                                setValue('features', filterd);
                              }
                            }}
                          />
                        }
                        label={f}
                      />
                    ))
                  ) : (
                    <EmptyState />
                  )}
                </Stack>
              </Box>
              <Stack direction="row" mt={1} justifyContent="end">
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Apply
                </LoadingButton>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>
    </FormProvider>
  );
};

MembershipCustom.propTypes = Props;

export default MembershipCustom;
