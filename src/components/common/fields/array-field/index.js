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
import EmptyState from '../../empty-state';
import { RHFAccordion } from '../../hook-form';
import { ICONS } from '../config-fields';

const ArrayFieldProps = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

/**
 * @param {ArrayFieldProps} props
 * @returns {JSX.Element}
 */
const ArrayField = (props) => {
  const { name, label } = props;
  const { setValue, watch } = useFormContext();
  const value = watch(name, []);

  const [newRule, setNewRule] = useState('');

  // handle add
  const handleAddRule = useCallback(() => {
    if (!newRule) return;
    setValue(name, [newRule, ...value]);
    setNewRule('');
  }, [value, setValue, newRule, name]);

  // handle remove
  const handleRemoveRule = useCallback(
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
        handleAddRule();
      }
    },
    [handleAddRule]
  );

  return (
    <RHFAccordion name={name} label={label}>
      <Stack>
        <TextField
          label="New Rule"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          onKeyDown={handleCatchEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="button" onClick={handleAddRule}>
                  {ICONS.add()}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        {value?.length ? (
          <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
            {value.map((v, index) => (
              <ListItem key={`${v}-${index}`} disablePadding>
                <ListItemButton>
                  <ListItemText primary={v} />
                  <ListItemIcon onClick={() => handleRemoveRule(index)}>
                    {ICONS.delete()}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <EmptyState text="No rules are applied" />
        )}
      </Stack>
    </RHFAccordion>
  );
};

ArrayField.propTypes = ArrayFieldProps;

export default ArrayField;
