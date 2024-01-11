import { memo, useCallback, useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';

import { Dialog, InputAdornment, OutlinedInput } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import Iconify from 'src/components/common/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';
import { createQueryString } from 'src/utils/query';

const BASE_PATH = paths.dashboard.warehouses.root;

// ----------------------------------------------------------------------

function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const searchDialog = useBoolean();

  const openSearchDialog = useCallback(() => {
    searchDialog.onTrue();
  }, [searchDialog]);

  const closeSearchDialog = useCallback(() => {
    searchDialog.onFalse();
  }, [searchDialog]);

  const handleSearchQuery = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    console.log('Searched For: ', searchQuery);
    router.push(`${BASE_PATH}/?${createQueryString('query', searchQuery, searchParams)}`);
    closeSearchDialog();
  }, [closeSearchDialog, router, searchParams, searchQuery]);

  // update states after refresh
  useEffect(() => {
    const query = searchParams.get('query');

    if (query) setSearchQuery(query);
  }, [searchParams]);

  return (
    <>
      <OutlinedInput
        value={searchQuery}
        onChange={handleSearchQuery}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <Iconify icon="eva:search-fill" />
            </IconButton>
          </InputAdornment>
        }
        size="small"
        sx={{ maxWidth: '350px', width: '100%', display: { xs: 'none', sm: 'inherit' } }}
      />

      <IconButton onClick={openSearchDialog} sx={{ display: { sm: 'none', xs: 'inherit' } }}>
        <Iconify icon="eva:search-fill" />
      </IconButton>

      <Dialog
        fullWidth
        sx={{ '& .MuiDialog-container': { alignItems: 'flex-start' } }}
        open={searchDialog.value}
        onClose={closeSearchDialog}
      >
        <OutlinedInput
          value={searchQuery}
          onChange={handleSearchQuery}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <Iconify icon="eva:search-fill" />
              </IconButton>
            </InputAdornment>
          }
          size="small"
          fullWidth
        />
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
