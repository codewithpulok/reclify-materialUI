import { Alert, Grid, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';
import { restrictNegetiveValue } from 'src/utils/form';

const Props = {};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CardEditFields = (props) => {
  const { formState } = useFormContext();
  const { errors } = formState;

  return (
    <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
      <Stack spacing={1}>
        {errors?.root?.message && <Alert severity="error">{errors?.root?.message}</Alert>}
        <RHFTextField name="cardHolder" label="Card Holder" />
        <Grid container>
          <Grid item xs={6}>
            <RHFTextField
              name="expirationMonth"
              label="Expire Month"
              type="number"
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              name="expirationYear"
              label="Expire Year"
              type="number"
              onChangeMiddleware={restrictNegetiveValue}
              fullWidth
            />
          </Grid>
        </Grid>
        <RHFSwitch name="isPrimary" label="Primary" />
      </Stack>
    </Scrollbar>
  );
};

CardEditFields.propTypes = Props;

export default CardEditFields;
