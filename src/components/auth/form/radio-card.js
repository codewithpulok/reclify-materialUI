import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { getIconify } from 'src/components/common/iconify/utilities';

const Props = {
  title: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const FormRadioCard = (props) => {
  const { control } = useFormContext();
  const { text, title, name, value, icon } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Card sx={{ borderRadius: 1 }}>
          <CardActionArea onClick={() => field.onChange(value)}>
            <CardContent
              component={Stack}
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{ px: 0.5, py: 1 }}
            >
              {icon && getIconify(icon, 56, { color: 'primary.main' })}

              <Stack mr="auto" spacing={0}>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </Stack>

              {field.value === value
                ? getIconify('solar:check-circle-bold-duotone', 38, { color: 'primary.main' })
                : getIconify('ph:circle-light', 38, { color: 'primary.main' })}
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    />
  );
};

FormRadioCard.propTypes = Props;

export default FormRadioCard;
