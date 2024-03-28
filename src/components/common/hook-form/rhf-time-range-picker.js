import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import { Box } from '@mui/material';
import { addHours } from 'date-fns';
import RHFTimePicker from './rhf-time-picker';

const RHFTimeRangePickerProps = {
  name: PropTypes.string,
  /** @type {SxProps} */
  wrapperSx: PropTypes.object,
};

// ----------------------------------------------------------------------

/**
 * Custom time range picker with React hook form
 * @param {RHFTimeRangePickerProps} props
 * @returns {JSX.Element}
 */
export default function RHFTimeRangePicker(props) {
  const { name, wrapperSx = {} } = props;
  const { watch } = useFormContext();
  const value = watch(name);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', ...wrapperSx }}>
      <RHFTimePicker name={`${name}.start`} label="Start Time" variant="mobile" />
      <RHFTimePicker
        name={`${name}.end`}
        label="End Time"
        minTime={value?.start ? addHours(value.start, 1) : undefined}
        variant="mobile"
      />
    </Box>
  );
}

RHFTimeRangePicker.propTypes = RHFTimeRangePickerProps;
