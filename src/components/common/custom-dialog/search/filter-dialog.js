import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { getRegionByCode, usRegions } from 'src/assets/data';
import {
  getAvailableServiceTypes,
  getServiceSubType,
  getServiceType,
} from 'src/constant/service-types';
import { RHFSelect, RHFTextField } from '../../hook-form';

// ----------------------------------------------------------------------
const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchFilterDialog = (props) => {
  const { onClose, open, handleSearch } = props;

  // form states
  const { watch, setValue, handleSubmit } = useFormContext();
  const type = watch('type');
  const service = watch('service');
  const region = watch('region');
  const subtypes = watch('subtypes');

  const subtypeOptions = useMemo(() => getServiceSubType(service) || [], [service]);

  // is valid filter
  const isValid = useMemo(() => {
    if (type === 'all') return true;

    if (type === 'service' && !!getServiceType(service) && Array.isArray(subtypes)) return true;

    if (type === 'warehouse' && !!getRegionByCode(region)) return true;

    return false;
  }, [region, service, subtypes, type]);

  // handle reset search
  const handleResetFilter = () => {
    setValue('type', 'all');
    setValue('service', '');
    setValue('region', '');
    setValue('subtypes', []);
    handleSubmit(handleSearch)();
    onClose();
  };

  // handle filter form submit
  const handleFilterSubmit = () => {
    handleSubmit(handleSearch)();
    onClose();
  };

  // update other fields based on type field update
  useEffect(() => {
    if (type === 'all') {
      setValue('service', '');
      setValue('region', '');
      setValue('subtypes', []);
    }
    //
    else if (type === 'service') {
      setValue('service', getAvailableServiceTypes()[0].value);
      setValue('region', '');
    }
    //
    else if (type === 'warehouse') {
      setValue('service', '');
      setValue('region', usRegions[0].code);
      setValue('subtypes', []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Filter Search</DialogTitle>

      <DialogContent>
        <Stack spacing={1.5} pt={0.5}>
          <RHFTextField name="type" select label="Search Type">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="service">Service</MenuItem>
            <MenuItem value="warehouse">Warehouse</MenuItem>
          </RHFTextField>

          {type === 'service' && (
            <>
              <RHFTextField
                name="service"
                select
                label="Service Type"
                onChangeMiddleware={(v) => {
                  if (v !== service) setValue('subtypes', []);
                  return v;
                }}
              >
                <MenuItem disabled>Select service type</MenuItem>
                {getAvailableServiceTypes().map((t) => (
                  <MenuItem value={t.value} key={t.value}>
                    {t.label}
                  </MenuItem>
                ))}
              </RHFTextField>
              {!!subtypeOptions?.length && (
                <RHFSelect
                  label="Service Subtypes"
                  multiple
                  name="subtypes"
                  options={subtypeOptions}
                />
              )}
            </>
          )}

          {type === 'warehouse' && (
            <RHFTextField name="region" select label="Warehouse Region">
              <MenuItem disabled>Select warehouse region</MenuItem>
              {usRegions.map((r) => (
                <MenuItem value={r.code} key={r.code}>
                  {r.name}
                </MenuItem>
              ))}
            </RHFTextField>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button color="error" variant="soft" type="button" onClick={handleResetFilter}>
          Reset
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleFilterSubmit}
          disabled={!isValid}
        >
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SearchFilterDialog.propTypes = Props;

export default SearchFilterDialog;
