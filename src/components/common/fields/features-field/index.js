import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { predefinedFeatures } from 'src/assets/data';
import { ICONS } from '../config-fields';

const FeaturesFieldProps = {
  name: PropTypes.string.isRequired,
};

/**
 * @param {FeaturesFieldProps} props
 * @returns {JSX.Element}
 */
const FeaturesField = (props) => {
  const { name } = props;
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  const handleToggle = useCallback(
    (key, newValue) => {
      setValue(`${name}.${key}`, newValue);
    },
    [name, setValue]
  );

  return (
    <Accordion
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'grey.600',
        '&.Mui-expanded': {
          bgcolor: 'background.default',
        },
      }}
      elevation={0}
      disableGutters
    >
      <AccordionSummary expandIcon={ICONS.expand()}>
        <Typography>Features</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={0.5}>
          {predefinedFeatures.map((feature) => {
            if (feature.type !== 'boolean') return null;
            return (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                key={feature.key}
              >
                <Typography variant="body2" color="text.secondary">
                  {feature.label}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={0.1}>
                  <Chip
                    label="Yes"
                    size="small"
                    variant={value?.[feature.key] ? 'soft' : 'outlined'}
                    color={value?.[feature.key] ? 'primary' : 'default'}
                    sx={{ borderRadius: 0.3 }}
                    onClick={
                      value?.[feature.key] ? undefined : () => handleToggle(feature.key, true)
                    }
                  />
                  <Chip
                    label="No"
                    size="small"
                    variant={!value?.[feature.key] ? 'soft' : 'outlined'}
                    color={!value?.[feature.key] ? 'error' : 'default'}
                    sx={{ borderRadius: 0.3 }}
                    onClick={
                      !value?.[feature.key] ? undefined : () => handleToggle(feature.key, false)
                    }
                  />
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

FeaturesField.propTypes = FeaturesFieldProps;

export default FeaturesField;
