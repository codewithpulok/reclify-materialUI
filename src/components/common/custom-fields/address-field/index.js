import {
  Autocomplete,
  Collapse,
  IconButton,
  ListItemText,
  Stack,
  TextField,
  debounce,
} from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { useLazyAddressSearchQuery } from 'src/redux-toolkit/services/addressApi';
import { joinAddressObj } from 'src/utils/address';
import { getIconify } from '../../iconify/utilities';
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

  const [searchAddress, results] = useLazyAddressSearchQuery();

  const addressCollapse = useBoolean(false);
  const { watch, setValue } = useFormContext();
  const addressValue = watch(name);

  const isEditable = useBoolean(true);

  const handleInputChange = useMemo(
    () =>
      debounce((_event, newValue) => {
        if (newValue?.length === 0) return;

        searchAddress(newValue);
      }, 400),
    [searchAddress]
  );

  const handleOptionChange = useCallback(
    (_event, newValue) => {
      const option = { ...newValue };
      // remove id
      option.id = option._id;
      delete option._id;

      setValue(name, option, true);
    },
    [name, setValue]
  );

  useEffect(() => {
    if (addressValue?.id === undefined) {
      isEditable.onTrue();
    } else {
      isEditable.onFalse();
    }
  }, [addressValue, isEditable]);

  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Autocomplete
          name={name}
          options={results?.data?.results || []}
          noOptionsText="No Address Found"
          getOptionKey={(option) => option?._id}
          filterOptions={(x) => x}
          getOptionLabel={(option) => joinAddressObj(option)}
          autoComplete={false}
          filterSelectedOptions
          autoHighlight
          fullWidth
          onInputChange={handleInputChange}
          renderOption={(params, option) => {
            const primary = joinAddressObj({ country: option?.country, state: option?.state });
            const secondary = joinAddressObj({ ...option, country: undefined, state: undefined });

            return (
              <li {...params}>
                <ListItemText primary={primary} secondary={secondary} />
              </li>
            );
          }}
          loading={results?.isLoading}
          loadingText="Searching for address"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Address"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {results?.isLoading || results?.isFetching
                      ? getIconify('eos-icons:loading')
                      : null}{' '}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          onChange={handleOptionChange}
          value={addressValue}
        />

        {isEditable.value && (
          <IconButton onClick={addressCollapse.onToggle}>
            {addressCollapse.value ? ICONS.close() : ICONS.edit()}
          </IconButton>
        )}
      </Stack>
      <Collapse unmountOnExit in={addressCollapse.value && isEditable.value} sx={{ mt: 1 }}>
        <Fields name={name} value={addressValue} />
      </Collapse>
    </Stack>
  );
};

AddressField.propTypes = AddressFieldProps;

export default AddressField;
