import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { RHFSwitch } from '../../hook-form';
import { ICONS } from '../config-fields';

const PredefinedSwitchFieldProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** @type {PredefinedField[]} */
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * @param {PredefinedSwitchFieldProps} props
 * @returns {JSX.Element}
 */
const PredefinedSwitchField = (props) => {
  const { name, fields, label } = props;

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
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={0.3}>
          {fields.map((field) => {
            if (field.type !== 'boolean') return null;
            return (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                key={field.key}
              >
                <Typography variant="body2" color="text.secondary">
                  {field.label}
                </Typography>

                <RHFSwitch name={`${name}.${field.key}`} size="small" />
              </Stack>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

PredefinedSwitchField.propTypes = PredefinedSwitchFieldProps;

export default PredefinedSwitchField;
