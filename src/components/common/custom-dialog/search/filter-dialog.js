import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { getRegionByCode, usRegions } from 'src/assets/data';
import {
  getAllServiceTypes,
  getAvailableServiceTypes,
  getServiceType,
} from 'src/constant/service-types';
import { createQueryString } from 'src/utils/query';

// ----------------------------------------------------------------------
const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  basePath: PropTypes.string.isRequired,
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchFilterDialog = (props) => {
  const { onClose, open, basePath } = props;

  // router state
  const searchParams = useSearchParams();
  const router = useRouter();
  const defServiceType = searchParams.get('serviceType');
  const defSearchType = searchParams.get('type');
  const defRegion = searchParams.get('region');

  // app state
  const [searchType, setSearchType] = useState(defSearchType || 'all');
  const [serviceType, setServiceType] = useState(defServiceType || null);
  const [warehouseRegion, setWarehouseRegion] = useState(defRegion || null);

  // is valid filter
  const isValid = useMemo(() => {
    if (searchType === 'all') return true;

    if (searchType === 'service' && !!getServiceType(serviceType)) return true;

    if (searchType === 'warehouse' && !!getRegionByCode(warehouseRegion)) return true;

    return false;
  }, [searchType, serviceType, warehouseRegion]);

  // handle service type change
  const handleServiceTypeChange = (value) => {
    setSearchType(value);

    if (value === 'all') {
      setServiceType(null);
      setWarehouseRegion(null);
    }
    //
    else if (value === 'service') {
      setServiceType(getAllServiceTypes()[0].value);
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

  // handle filter execution
  const handleSubmitFilter = useCallback(() => {
    let queryString;

    if (searchType === 'all') queryString = createQueryString('type', null, searchParams);
    else queryString = createQueryString('type', searchType, searchParams);

    queryString = createQueryString('serviceType', serviceType, queryString);
    queryString = createQueryString('region', warehouseRegion, queryString);

    router.push(`${basePath}/?${queryString}`);
    onClose();
  }, [basePath, onClose, router, searchParams, searchType, serviceType, warehouseRegion]);

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
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button color="error" variant="soft" onClick={handleResetFilter}>
          Reset
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmitFilter}
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
