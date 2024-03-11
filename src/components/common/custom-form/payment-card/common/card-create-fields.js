import { Alert, Box, Stack } from '@mui/material';
import { CardElement } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import Scrollbar from 'src/components/common/scrollbar';

const Props = {
  hidePrimary: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CardCreateFields = (props) => {
  const { hidePrimary } = props;

  const { formState } = useFormContext();
  const { errors } = formState;

  return (
    <Scrollbar sx={{ maxHeight: 400, pt: 0.7 }}>
      <Stack spacing={1}>
        {errors?.root?.message && <Alert severity="error">{errors?.root?.message}</Alert>}
        <RHFTextField name="cardHolder" label="Card Holder" />
        <Box my={1.2}>
          <CardElement />
        </Box>
        {!hidePrimary && <RHFSwitch name="isPrimary" label="Primary" />}
      </Stack>
    </Scrollbar>
  );
};

CardCreateFields.propTypes = Props;

export default CardCreateFields;
