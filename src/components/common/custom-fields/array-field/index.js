import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { restrictMaxLength } from 'src/utils/form';
import { EmptyState } from '../../custom-state';
import { RHFAccordion } from '../../hook-form';
import { ICONS } from '../config-fields';

const Props = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultExpanded: PropTypes.bool,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  /** @type {import('@mui/material').TextFieldProps} */
  fieldProps: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ArrayField = (props) => {
  const { name, label, defaultExpanded, max, maxLength, fieldProps } = props;
  const { setValue, watch } = useFormContext();
  const value = watch(name, []);
  const maxLimitReach = useMemo(() => {
    if (typeof max !== 'number' || Number.isNaN(max)) return false;

    return value.length >= max;
  }, [max, value.length]);

  const [newValue, setNewValue] = useState('');

  // handle rule change
  const handleValueChange = (fieldValue) => {
    const slicedValue = maxLength ? restrictMaxLength(maxLength)(fieldValue) : fieldValue;
    setNewValue(slicedValue);
  };

  // handle add
  const handleAddValue = useCallback(() => {
    if (!newValue || maxLimitReach) return;
    setValue(name, [newValue, ...value]);
    setNewValue('');
  }, [newValue, maxLimitReach, setValue, name, value]);

  // handle remove
  const handleRemoveValue = useCallback(
    (deleteIndex) => {
      const filteredRules = [...value].filter((f, i) => i !== deleteIndex);
      setValue(name, filteredRules);
    },
    [value, setValue, name]
  );

  // this works like a form submit
  const handleCatchEnter = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAddValue();
      }
    },
    [handleAddValue]
  );

  return (
    <RHFAccordion name={name} label={label} defaultExpanded={defaultExpanded}>
      <Stack>
        <TextField
          label="New Item"
          value={newValue}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={handleCatchEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="button" onClick={handleAddValue} disabled={maxLimitReach}>
                  {ICONS.add()}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          helperText={maxLength ? `${200 - (newValue?.length || 0)} character left` : undefined}
          {...fieldProps}
        />
        {value && value?.length ? (
          <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
            {value.map((v, index) => (
              <ListItem key={`${v}-${index}`} disablePadding>
                <ListItemButton>
                  <ListItemText primary={v} />
                  <ListItemIcon onClick={() => handleRemoveValue(index)}>
                    {ICONS.delete()}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState text={`No ${label} are here`} />
        )}
      </Stack>
    </RHFAccordion>
  );
};

ArrayField.propTypes = Props;

export default ArrayField;
