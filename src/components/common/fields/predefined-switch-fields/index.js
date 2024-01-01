import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { RHFAccordion, RHFSwitch } from '../../hook-form';

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

  return (
    <RHFAccordion name={name} label={label}>
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
    </RHFAccordion>
  );
};

PredefinedSwitchFields.propTypes = PredefinedSwitchFieldsProps;

export default PredefinedSwitchFields;
