import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { RHFAccordion, RHFTextField } from '../../hook-form';

const PredefinedFieldsProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** @type {PredefinedField[]} */
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * @param {PredefinedFieldsProps} props
 * @returns {JSX.Element}
 */
const PredefinedFields = (props) => {
  const { name, fields, label } = props;

  return (
    <RHFAccordion name={name} label={label}>
      <Stack spacing={1.3}>
        {fields.map((field) => {
          if (field.type === 'boolean') return null;
          if (field.type === 'custom') return null;
          return (
            <RHFTextField
              name={`${name}.${field.key}`}
              label={field.label}
              key={field.key}
              type={field.type}
              multiline={field.multiline}
              rows={2}
            />
          );
        })}
      </Stack>
    </RHFAccordion>
  );
};

PredefinedFields.propTypes = PredefinedFieldsProps;

export default PredefinedFields;
