import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { getRegionByCode, usRegions } from 'src/assets/data';
import {
  getAvailableServiceTypes,
  getServiceSubType,
  getServiceType,
} from 'src/constant/service-types';

// ----------------------------------------------------------------------
const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // basePath: PropTypes.string.isRequired,
  searchType: PropTypes.string,
  serviceType: PropTypes.string,
  warehouseRegion: PropTypes.string,
  serviceSubtypes: PropTypes.array,

  setServiceSubtypes: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
  setServiceType: PropTypes.func.isRequired,
  setWarehouseRegion: PropTypes.func.isRequired,
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchFilterDialog = (props) => {
  const {
    onClose,
    open,
    searchType,
    serviceType,
    warehouseRegion,
    setSearchType,
    setServiceType,
    setWarehouseRegion,
    onSubmit,
    setServiceSubtypes,
    serviceSubtypes = [],
  } = props;

  const subtypes = useMemo(() => getServiceSubType(serviceType) || [], [serviceType]);

  // is valid filter
  const isValid = useMemo(() => {
    if (searchType === 'all') return true;

    if (searchType === 'service' && !!getServiceType(serviceType) && Array.isArray(serviceSubtypes))
      return true;

    if (searchType === 'warehouse' && !!getRegionByCode(warehouseRegion)) return true;

    return false;
  }, [searchType, serviceSubtypes, serviceType, warehouseRegion]);

  // handle service type change
  const handleServiceTypeChange = (value) => {
    setSearchType(value);

    if (value === 'all') {
      setServiceType(null);
      setWarehouseRegion(null);
    }
    //
    else if (value === 'service') {
      setServiceType(getAvailableServiceTypes()[0].value);
      setWarehouseRegion(null);
    }
    //
    else if (value === 'warehouse') {
      setServiceType(null);
      setWarehouseRegion(usRegions[0].code);
    }
  };

  // handle reset search
  const handleResetFilter = () => {
    setSearchType('all');
    setServiceType(null);
    setWarehouseRegion(null);
  };

  const handleSubmit = () => {
    onClose();
    onSubmit();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Filter Search</DialogTitle>

      <DialogContent>
        <Stack spacing={1.5} pt={0.5}>
          <TextField
            select
            label="Search Type"
            value={searchType}
            onChange={(e) => handleServiceTypeChange(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="service">Service</MenuItem>
            <MenuItem value="warehouse">Warehouse</MenuItem>
          </TextField>

          {searchType === 'service' && (
            <TextField
              select
              label="Service Type"
              value={serviceType ?? ''}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <MenuItem disabled>Select service type</MenuItem>
              {getAvailableServiceTypes().map((t) => (
                <MenuItem value={t.value} key={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          {searchType === 'warehouse' && (
            <TextField
              select
              label="Warehouse Region"
              value={warehouseRegion ?? ''}
              onChange={(e) => setWarehouseRegion(e.target.value)}
            >
              <MenuItem disabled>Select warehouse region</MenuItem>
              {usRegions.map((r) => (
                <MenuItem value={r.code} key={r.code}>
                  {r.name}
                </MenuItem>
              ))}
            </TextField>
          )}

          {!!subtypes?.length && (
            <FormControl>
              <InputLabel>Service Subtypes</InputLabel>
              <Select
                multiple
                value={serviceSubtypes}
                onChange={(e) => setServiceSubtypes(e.target.value)}
                input={<OutlinedInput label="Service Subtypes" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} variant="outlined" />
                    ))}
                  </Box>
                )}
              >
                <MenuItem disabled>Select Service Subtypes</MenuItem>
                {subtypes.map((type) => (
                  <MenuItem value={type.value} key={type.value}>
                    <Checkbox checked={serviceSubtypes?.includes(type.value)} />
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button color="error" variant="soft" onClick={handleResetFilter}>
          Reset
        </Button>
        <Button color="primary" variant="contained" onClick={handleSubmit} disabled={!isValid}>
          Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SearchFilterDialog.propTypes = Props;

export default SearchFilterDialog;
