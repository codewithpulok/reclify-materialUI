import { Button, IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFAccordion, RHFTextField } from 'src/components/common/hook-form';
import { ICONS } from '../config-settings';

// ----------------------------------------------------------------------

const Props = {};
const fieldName = 'customerList';
const fieldLabel = 'Customer List';
const defaultValues = { name: '', image: '' };

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CustomerList = (props) => {
  const { control } = useFormContext();
  const { append, fields, remove } = useFieldArray({ name: fieldName, control, keyName: '_id' });

  // add a new customer field
  const addCustomer = () => {
    append(defaultValues);
  };

  // remove a customer field
  const removeCustomer = (index) => {
    remove(index);
  };

  return (
    <RHFAccordion name={fieldName} label={fieldLabel} defaultExpanded>
      <Stack spacing={1}>
        {fields.map((field, index) => (
          <CustomerField index={index} onDelete={() => removeCustomer(index)} key={field._id} />
        ))}

        <Button color="primary" variant="soft" onClick={addCustomer} fullWidth>
          Add Customer
        </Button>
      </Stack>
    </RHFAccordion>
  );
};

CustomerList.propTypes = Props;

export default CustomerList;

// ----------------------------------------------------------------------

const CProps = {
  onDelete: PropTypes.func,
  index: PropTypes.number,
};

// ----------------------------------------------------------------------

/**
 * @param {CProps} props
 * @returns {JSX.Element}
 */
const CustomerField = (props) => {
  const { onDelete, index } = props;
  return (
    <Stack spacing={0.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="overline" color="text.secondary">
          customer #{index + 1}
        </Typography>
        <IconButton onClick={onDelete} color="error" size="small">
          {ICONS.delete()}
        </IconButton>
      </Stack>
      <RHFTextField name={`${fieldName}.${index}.name`} label="Name" fullWidth />
      <RHFTextField name={`${fieldName}.${index}.image`} label="Image" fullWidth />
    </Stack>
  );
};

CustomerField.propTypes = CProps;
