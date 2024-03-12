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
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { EmptyState } from '../../custom-state';
import { RHFAccordion } from '../../hook-form';
import { ICONS } from '../config-fields';

const Props = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultExpanded: PropTypes.bool,
  max: PropTypes.number,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ArrayField = (props) => {
  const { name, label, defaultExpanded, max } = props;
  const { setValue, watch } = useFormContext();
  const value = watch(name, []);

  const [newRule, setNewRule] = useState('');

  // handle add
  const handleAddValue = useCallback(() => {
    if (!newRule) return;
    setValue(name, [newRule, ...value]);
    setNewRule('');
  }, [value, setValue, newRule, name]);

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
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          onKeyDown={handleCatchEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={handleAddValue}
                  disabled={typeof max === 'number' && value.length === max}
                >
                  {ICONS.add()}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
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
