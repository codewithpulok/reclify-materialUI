import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { fDay } from 'src/utils/format-time';
import { RHFAccordion, RHFSwitch } from '../../hook-form';

const DaysFieldProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultExpanded: PropTypes.bool,
};

/**
 * @param {DaysFieldProps} props
 * @returns {JSX.Element}
 */
const DaysField = (props) => {
  const { name, label, defaultExpanded } = props;
  return (
    <RHFAccordion
      name={name}
      label={label}
      sx={{ borderRadius: 1 }}
      defaultExpanded={defaultExpanded}
    >
      <Stack spacing={0.3}>
        {Array.from(Array(6).keys()).map((day) => (
          <RHFSwitch key={day} name={`${name}.${day}`} label={fDay(day)} size="small" />
        ))}
      </Stack>
    </RHFAccordion>
  );
};

DaysField.propTypes = DaysFieldProps;

export default DaysField;
