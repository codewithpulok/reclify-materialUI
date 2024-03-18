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
import { useDialog } from 'src/hooks/use-dialog';
import { useLazyAddressSearchQuery } from 'src/redux-toolkit/services/addressApi';
import { joinAddressObj } from 'src/utils/address';
import { AddressDeleteDialog } from '../../custom-dialog';
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

  // dialog state
  const deleteDialog = useDialog();

  // logic state
  const addressCollapse = useBoolean(false);
  const isDeleteable = useBoolean(false);

  // form state
  const { watch, setValue, getFieldState } = useFormContext();
  const { error } = getFieldState(name);
  const addressValue = watch(name, {});
  const hasAddressValue = Object.values(addressValue).some(Boolean);

  // search for address while changing the input
  const handleInputChange = useMemo(
    () =>
      debounce((_event, newValue, reason) => {
        if (newValue?.length === 0) return;
        if (reason === 'input') searchAddress(newValue);
      }, 400),
    [searchAddress]
  );

  // handle opiton select from autocomplete
  const handleOptionChange = useCallback(
    (_event, newValue) => {
      // if click on create new then open the address form

      if (newValue?.id === 'CREATE') {
        addressCollapse.onTrue();
        return;
      }

      const option = { ...newValue };
      setValue(name, option, true);
    },
    [addressCollapse, name, setValue]
  );

  const resetAddress = useCallback(() => {
    setValue(name, {});
    addressCollapse.onFalse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // make state editable or not
  useEffect(() => {
    if (addressValue?.id === undefined || !addressValue?.id) {
      isDeleteable.onFalse();
    } else {
      isDeleteable.onTrue();
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
          filterOptions={(x) => [{ id: 'CREATE' }, ...x]}
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
            if (option.id === 'CREATE') {
              return (
                <li {...params} key={option.id}>
                  <ListItemText primary="Create New Address" />
                </li>
              );
            }

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
                  <Stack direction="row" alignItems="center" pr={1}>
                    {results?.isLoading || results?.isFetching
                      ? getIconify('eos-icons:loading')
                      : null}

                    {hasAddressValue && (
                      <IconButton color="warning" size="small" onClick={addressCollapse.onToggle}>
                        {ICONS.edit()}
                      </IconButton>
                    )}
                    {isDeleteable.value && (
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => deleteDialog.onOpen(addressValue)}
                      >
                        {ICONS.delete()}
                      </IconButton>
                    )}
                  </Stack>
                ),
                slotProps: {
                  root: {
                    sx: { pr: '0px!important' },
                  },
                },
                readOnly: addressCollapse.value,
              }}
              error={!!Object.keys(error || {}).length}
            />
          )}
          onChange={handleOptionChange}
          value={addressValue}
        />

        {/* custom action button */}
        {actionBtn}
      </Stack>
      <Collapse in={addressCollapse.value} sx={{ mt: addressCollapse.value ? 1 : 0 }}>
        <Fields name={name} value={addressValue} />
      </Collapse>

      <AddressDeleteDialog
        address={deleteDialog.value}
        onClose={deleteDialog.onClose}
        open={deleteDialog.open}
        successCallback={resetAddress}
      />
    </Stack>
  );
};

AddressField.propTypes = AddressFieldProps;

export default AddressField;
