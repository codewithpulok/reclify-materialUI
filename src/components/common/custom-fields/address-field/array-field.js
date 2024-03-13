import { Button, IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AddressField from '.';
import { EmptyState } from '../../custom-state';
import { ICONS } from '../config-fields';

/**
 * @param {AddressArrayField.propTypes} props
 * @returns {JSX.Element}
 */
const AddressArrayField = (props) => {
  const { name } = props;

  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name, control, keyName: '_id' });

  const handleRemove = (index) => remove(index);
  const handleAppend = () => {
    append({
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    });
  };

  return (
    <>
      <Stack spacing={1}>
        {fields.length ? (
          fields.map((f, index) => (
            <AddressField
              name={`${name}.${index}`}
              actionBtn={
                <IconButton color="error" onClick={() => handleRemove(index)}>
                  {ICONS.delete()}
                </IconButton>
              }
            />
          ))
        ) : (
          <EmptyState />
        )}
      </Stack>

      <Button
        fullWidth
        size="large"
        color="primary"
        variant="soft"
        onClick={handleAppend}
        sx={{ mt: 2 }}
      >
        Add New Address
      </Button>
    </>
  );
};

AddressArrayField.propTypes = {
  name: PropTypes.string,
};

export default AddressArrayField;
