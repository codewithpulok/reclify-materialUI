import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFSwitch } from '../../hook-form';
import { ICONS } from '../config-fields';

const PredefinedSwitchFieldsProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** @type {PredefinedField[]} */
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * @param {PredefinedSwitchFieldsProps} props
 * @returns {JSX.Element}
 */
const PredefinedSwitchFields = (props) => {
  const { name, fields, label } = props;
  const {
    formState: { errors },
  } = useFormContext();
  const isError = useMemo(() => Object.keys(errors?.[name] || {}).length > 0, [errors, name]);

  return (
    <Accordion
      sx={{
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isError ? 'error.main' : 'grey.600',
        '&.Mui-expanded': {
          bgcolor: 'background.default',
        },
      }}
      elevation={0}
      disableGutters
    >
      <AccordionSummary
        expandIcon={ICONS.expand(24, { color: isError ? 'error.main' : 'text.default' })}
      >
        <Typography variant="overline" color={isError ? 'error.main' : 'text.default'}>
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={0}>
          {fields.map((field) => {
            if (field.type !== 'boolean') return null;
            return (
              <RHFSwitch
                name={`${name}.${field.key}`}
                size="medium"
                label={field.label}
                key={field.key}
                labelProps={{
                  labelPlacement: 'start',
                  sx: { justifyContent: 'space-between', width: '100%', mx: 0 },
                }}
              />
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

PredefinedSwitchFields.propTypes = PredefinedSwitchFieldsProps;

export default PredefinedSwitchFields;
