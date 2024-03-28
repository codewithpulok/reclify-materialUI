import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
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
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ArrayField } from 'src/components/common/custom-fields';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { useUpgradePlanMutation } from 'src/redux-toolkit/services/adminApi';
import { usePlanGetQuery } from 'src/redux-toolkit/services/planApi';
import { restrictNegetiveValue } from 'src/utils/form';
import * as Yup from 'yup';

// ----------------------------------------------------------------------
const Props = {
  userId: PropTypes.string,
};
/** @type {PlanId} */
const planId = 'enterprise';
const defaultValues = {
  price: null,
  features: [],
  additionalFeatures: [],
};

const schema = Yup.object().shape({
  price: Yup.number().label('Price').required(),
  features: Yup.array().label('Features'),
});

// ----------------------------------------------------------------------
const MembershipCustom = (props) => {
  const { userId } = props;

  // api state
  const planResponse = usePlanGetQuery({ id: planId, userId });
  const [upgradePlan] = useUpgradePlanMutation();

  // form state
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { handleSubmit, formState, watch, setValue, reset } = methods;
  const { isSubmitting } = formState;
  const features = watch('features', []);

  // handle submit
  const onSubmit = useCallback(
    async (formValues) => {
      if (!planResponse?.data?.results?.features?.[0]) return;

      console.log('Plan Upgrade: ', formValues);

      formValues.features = [
        planResponse.data.results.features[0],
        ...formValues.features,
        ...formValues.additionalFeatures,
      ];
      const response = await upgradePlan({ id: userId, data: formValues });
      const { data, error } = response;

      // error state
      if (error || data?.isError) {
        enqueueSnackbar('Error in upgrade plan', { variant: 'error' });
        console.error('Plan Upgrade Error:', response);
        reset(defaultValues);
      }
      // success state
      else if (!error && data?.success) {
        enqueueSnackbar('Plan Upgraded');
        console.warn('Plan Upgraded:', response);
        reset(defaultValues);
      }
    },
    [planResponse?.data?.results?.features, reset, upgradePlan, userId]
  );

  const isLoading = planResponse?.isLoading || planResponse?.isFetching;
  const isError = !planResponse?.isLoading && !planResponse?.isFetching && planResponse?.isError;
  const isSuccess =
    !planResponse?.isLoading && !planResponse?.isFetching && planResponse?.isSuccess;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Customize Membership" />
        <CardContent>
          {isLoading && <LoadingState />}
          {isError && <ErrorState />}
          {isSuccess && (
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
              <Stack spacing={0.5}>
                <Typography variant="overline" color="text.secondary">
                  Features
                </Typography>
                <Stack>
                  {planResponse.data?.results?.features?.length ? (
                    planResponse.data.results.features.map((f, index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={index === 0 ? true : features.includes(f)}
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
                            disabled={index === 0}
                          />
                        }
                        label={f}
                        key={`${f}-${index}`}
                      />
                    ))
                  ) : (
                    <EmptyState />
                  )}
                </Stack>

                <ArrayField defaultExpanded label="Additional Features" name="additionalFeatures" />
              </Stack>
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
