import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import {
  RHFAccordion,
  RHFSwitch,
  RHFTextField,
  RHFTextSwitch,
  RHFTimeRangePicker,
} from '../../hook-form';
import DaysField from '../days-field';

const Props = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** @type {PredefinedField[]} */
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PredefinedFields = (props) => {
  const { name, fields, label } = props;

  return (
    <RHFAccordion name={name} label={label}>
      <Stack spacing={1.3}>
        {fields.map((field) => {
          // avoid custom data types
          if (field.dataType === 'custom') return null;

          const fieldName = `${name}.${field.key}`;

          // switch field
          if (field.fieldType === 'switch') {
            return (
              <RHFSwitch
                name={fieldName}
                size="medium"
                label={field.label}
                key={field.key}
                labelProps={{
                  labelPlacement: 'start',
                  sx: { justifyContent: 'space-between', width: '100%', mx: 0 },
                }}
              />
            );
          }

          // text switch field
          if (field.fieldType === 'text-switch') {
            return <RHFTextSwitch key={field.key} name={fieldName} label={field.label} />;
          }

          // days picker field
          if (field.fieldType === 'days-picker') {
            return <DaysField name={fieldName} label={field.label} key={field.key} />;
          }

          // time picker field
          if (field.fieldType === 'time-picker') {
            return (
              <RHFTimeRangePicker
                name={fieldName}
                label={field.label}
                key={field.key}
                wrapperSx={{ gap: 1.3 }}
              />
            );
          }

          // text field (default)
          return (
            <RHFTextField
              name={fieldName}
              label={field.label}
              key={field.key}
              type={field.dataType}
              multiline={field.multiline}
              rows={2}
            />
          );
        })}
      </Stack>
    </RHFAccordion>
  );
};

PredefinedFields.propTypes = Props;

export default PredefinedFields;
