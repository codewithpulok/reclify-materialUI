import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import { FormHelperText, Rating, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RHFRatingProps = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
};

/**
 * Material UI Rating with React Hook Form
 * @param {RHFRatingProps & import('@mui/material/Rating').RatingProps} props
 * @returns {JSX.Element}
 */
export default function RHFRating(props) {
  const { name, helperText, label, ...other } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              {label}
            </Typography>
          )}
          <Rating
            value={field.value}
            onChange={(_e, newValue) => field.onChange(newValue)}
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}

RHFRating.propTypes = RHFRatingProps;
