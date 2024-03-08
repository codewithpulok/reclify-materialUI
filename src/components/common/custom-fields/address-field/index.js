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
  actionBtn: PropTypes.node,
};

/**
 * @param {AddressFieldProps} props
 * @returns {JSX.Element}
 */
const AddressField = (props) => {
  const { name, actionBtn = null } = props;

  // api state
  const [searchAddress, results] = useLazyAddressSearchQuery();

  // logic state
  const addressCollapse = useBoolean(false);
  const isEditable = useBoolean(true);

  // form state
  const { watch, setValue, getFieldState } = useFormContext();
  const { error } = getFieldState(name);
  const addressValue = watch(name, {});

  // search for address while changing the input
  const handleInputChange = useMemo(
    () =>
      debounce((_event, newValue) => {
        if (newValue?.length === 0) return;
        if (Object.values(addressValue || {}).some(Boolean)) return;

        searchAddress(newValue);
      }, 400),
    [searchAddress, addressValue]
  );

  // handle opiton select from autocomplete
  const handleOptionChange = useCallback(
    (_event, newValue) => {
      const option = { ...newValue };

      setValue(name, option, true);
    },
    [name, setValue]
  );

  // make state editable or not
  useEffect(() => {
    if (addressValue?.id === undefined) {
      isEditable.onTrue();
    } else {
      isEditable.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressValue]);

  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Autocomplete
          name={name}
          options={results?.data?.results || []}
          noOptionsText="No Address Found"
          getOptionKey={(option) => option.id}
          filterOptions={(x) => x}
          getOptionLabel={(option) => joinAddressObj(option)}
          autoComplete={false}
          filterSelectedOptions
          autoHighlight
          fullWidth
          isOptionEqualToValue={(option, value) =>
            value?.id && option?.id && option?.id === value?.id
          }
          onInputChange={handleInputChange}
          renderOption={(params, option) => {
            const primary = joinAddressObj({ country: option?.country, state: option?.state });
            const secondary = joinAddressObj({ ...option, country: undefined, state: undefined });

            return (
              <li {...params} key={option.id}>
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
              error={!!Object.keys(error || {}).length}
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
        {/* custom action button */}
        {actionBtn}
      </Stack>
      <Collapse
        in={addressCollapse.value && isEditable.value}
        sx={{ mt: addressCollapse.value && isEditable.value ? 1 : 0 }}
      >
        <Fields name={name} value={addressValue} />
      </Collapse>
    </Stack>
  );
};

AddressField.propTypes = AddressFieldProps;

export default AddressField;
