import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { RHFAccordion, RHFTextSwitch } from '../../hook-form';

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

  return (
    <RHFAccordion name={name} label={label}>
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
    </RHFAccordion>
  );
};

PredefinedTextSwitchFields.propTypes = PredefinedTextSwitchFieldsProps;

export default PredefinedTextSwitchFields;
