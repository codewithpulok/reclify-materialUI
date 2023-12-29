import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFTextSwitch } from '../../hook-form';
import { ICONS } from '../config-fields';

const PredefinedTextSwitchFieldsProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** @type {PredefinedField[]} */
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * @param {PredefinedTextSwitchFieldsProps} props
 * @returns {JSX.Element}
 */
const PredefinedTextSwitchFields = (props) => {
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
      <AccordionSummary expandIcon={ICONS.expand()}>
        <Typography variant="overline" color={isError ? 'error.main' : 'text.default'}>
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={0.5}>
          {fields.map((feature) => {
            if (feature.type !== 'boolean') return null;
            return (
              <RHFTextSwitch
                key={feature.key}
                name={`${name}.${feature.key}`}
                label={feature.label}
              />
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

PredefinedTextSwitchFields.propTypes = PredefinedTextSwitchFieldsProps;

export default PredefinedTextSwitchFields;
