import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { getIconify } from 'src/components/common/iconify/utilities';
import {
  RHFAccordion,
  RHFSelect,
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
  defaultExpanded: PropTypes.bool,
  showIcon: PropTypes.bool,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PredefinedFields = (props) => {
  const { name, fields, label, defaultExpanded, showIcon } = props;

  return (
    <RHFAccordion name={name} label={label} defaultExpanded={defaultExpanded}>
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
                size="small"
                label={
                  showIcon ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {field?.icon ? getIconify(field.icon, 16) : '-'}
                      <Typography>{field.label}</Typography>
                    </Stack>
                  ) : (
                    field.label
                  )
                }
                key={field.key}
                labelProps={{
                  sx: { gap: 1 },
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
            return (
              <DaysField name={fieldName} label={field.label} key={field.key} defaultExpanded />
            );
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

          // dropdown field
          if (field.fieldType === 'dropdown') {
            return (
              <RHFSelect
                name={fieldName}
                label={field.label}
                options={field.options?.map((o) => ({ label: o, value: o })) || []}
                multiple={field.dataType === 'array'}
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
