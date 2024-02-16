import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { RHFCheckbox, RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { usePlanGetQuery } from 'src/redux-toolkit/services/planApi';
import { restrictNegetiveValue } from 'src/utils/form';

// ----------------------------------------------------------------------
const Props = {};
/** @type {PlanId} */
const planId = 'enterprise';
const defaultValues = {
  price: null,
  features: [],
};

// ----------------------------------------------------------------------
const MembershipCustom = (props) => {
  // api state
  const planResponse = usePlanGetQuery(planId);

  // form state
  const methods = useForm({ defaultValues });
  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  // handle submit
  const onSubmit = (formValues) => {
    console.log(formValues);
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
                      <RHFCheckbox label={f} name={`features.${index}`} key={index} />
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
