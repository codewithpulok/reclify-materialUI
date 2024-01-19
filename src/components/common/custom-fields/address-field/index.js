import { Collapse, IconButton, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { useFormContext } from 'react-hook-form';
import { getWarehouseAddress } from 'src/components/warehouse/utils';
import { useBoolean } from 'src/hooks/use-boolean';
import { ICONS } from '../config-fields';
import Fields from './fields';

const AddressFieldProps = {
  name: PropTypes.string.isRequired,
};

/**
 * @param {AddressFieldProps} props
 * @returns {JSX.Element}
 */
const AddressField = (props) => {
  const { name } = props;
  const addressCollapse = useBoolean(false);
  const { watch } = useFormContext();
  const addressValue = watch(name);

  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <TextField value={getWarehouseAddress(addressValue)} label="Address" readOnly fullWidth />
        <IconButton onClick={addressCollapse.onToggle}>
          {addressCollapse.value ? ICONS.close() : ICONS.edit()}
        </IconButton>
      </Stack>
      <Collapse in={addressCollapse.value} sx={{ mt: 1 }}>
        <Fields name={name} value={addressValue} />
      </Collapse>
    </Stack>
  );
};

AddressField.propTypes = AddressFieldProps;

export default AddressField;
