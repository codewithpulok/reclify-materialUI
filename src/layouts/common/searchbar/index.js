// TODO: make it clear

import { memo, useCallback, useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';

import { Dialog, FilledInput, InputAdornment, Tooltip } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { SearchFilterDialog } from 'src/components/common/custom-dialog';
import Iconify from 'src/components/common/iconify';
import { useDialog } from 'src/hooks/use-dialog';
import { createQueryString } from 'src/utils/query';

const Props = {
  basePath: PropTypes.string.isRequired,
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
function Searchbar(props) {
  const { basePath } = props;
  const router = useRouter();

  // query states
  const searchParams = useSearchParams();
  const defServiceType = searchParams.get('serviceType');
  const defSearchType = searchParams.get('type');
  const defRegion = searchParams.get('region');
  const defSubtypes = searchParams.get('subtype');

  // app state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState(defSearchType || 'all');
  const [serviceType, setServiceType] = useState(defServiceType || null);
  const [warehouseRegion, setWarehouseRegion] = useState(defRegion || null);
  const [serviceSubtypes, setServiceSubtypes] = useState(defSubtypes?.split(',') || []);

  // dialog state
  const searchDialog = useDialog();
  const filterDialog = useDialog();

  // handle query field change
  const handleQueryChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  // handle search
  const handleSearch = useCallback(() => {
    if (!searchQuery) return; // if there is no search query then skip search

    let queryString;

    if (searchType === 'all') queryString = createQueryString('type', null, searchParams);
    else queryString = createQueryString('type', searchType, searchParams);

    queryString = createQueryString('serviceType', serviceType, queryString);
    queryString = createQueryString('region', warehouseRegion, queryString);
    queryString = createQueryString('subtype', serviceSubtypes?.join(','), queryString);

    queryString = createQueryString('query', searchQuery, queryString);

    console.log('Searched For: ', searchQuery);
    router.push(`${basePath}/?${queryString}`);
    searchDialog.onClose();
  }, [
    searchQuery,
    searchType,
    searchParams,
    serviceType,
    warehouseRegion,
    serviceSubtypes,
    router,
    basePath,
    searchDialog,
  ]);

  // handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // update states after refresh
  useEffect(() => {
    const query = searchParams.get('query');

    if (query) setSearchQuery(query);
  }, [searchParams]);

  return (
    <>
      <form style={{ width: '60%' }} onSubmit={handleSearchSubmit}>
        <FilledInput
          value={searchQuery}
          onChange={handleQueryChange}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Apply filters">
                <IconButton onClick={filterDialog.onOpen}>
                  <Iconify icon="lets-icons:filter" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
          placeholder="Search here"
          hiddenLabel
          sx={{ display: { xs: 'none', sm: 'flex' }, bgcolor: 'background.paper' }}
          fullWidth
        />
      </form>

      <IconButton onClick={searchDialog.onOpen} sx={{ display: { sm: 'none', xs: 'inherit' } }}>
        <Iconify icon="eva:search-fill" />
      </IconButton>

      <Dialog
        fullWidth
        sx={{ '& .MuiDialog-container': { alignItems: 'flex-start' } }}
        open={searchDialog.open}
        onClose={searchDialog.onClose}
      >
        <form style={{ width: '100%' }} onSubmit={handleSearchSubmit}>
          <FilledInput
            value={searchQuery}
            onChange={handleQueryChange}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" />
              </InputAdornment>
            }
            size="small"
            fullWidth
            hiddenLabel
          />
        </form>
      </Dialog>

      <SearchFilterDialog
        open={filterDialog.open}
        onClose={filterDialog.onClose}
        basePath={basePath}
        searchType={searchType}
        serviceType={serviceType}
        setSearchType={setSearchType}
        setServiceType={setServiceType}
        setWarehouseRegion={setWarehouseRegion}
        warehouseRegion={warehouseRegion}
        onSubmit={handleSearch}
        serviceSubtypes={serviceSubtypes}
        setServiceSubtypes={setServiceSubtypes}
      />
    </>
  );
}

Searchbar.propTypes = Props;

export default memo(Searchbar);
