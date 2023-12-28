import Stack from '@mui/material/Stack';
// local components
import { RHFTextField } from 'src/components/common/hook-form';
import RHFRating from 'src/components/common/hook-form/rhf-rating';

const ReviewEditFields = (props) => (
  <Stack spacing={2}>
    <RHFRating name="rating" label="Rating" size="large" />
    <RHFTextField name="feedback" label="Feedback" minRows={3} multiline fullWidth />
  </Stack>
);

ReviewEditFields.propTypes = {};

export default ReviewEditFields;
