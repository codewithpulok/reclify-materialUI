import { memo, useCallback, useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';

import { Dialog, FilledInput, InputAdornment } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import Iconify from 'src/components/common/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { paths } from 'src/routes/paths';
import { createQueryString } from 'src/utils/query';

const BASE_PATH = paths.dashboard.search.root;

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

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      console.log('Searched For: ', searchQuery);
      router.push(`${BASE_PATH}/?${createQueryString('query', searchQuery, searchParams)}`);
      closeSearchDialog();
    },
    [closeSearchDialog, router, searchParams, searchQuery]
  );

  // update states after refresh
  useEffect(() => {
    const query = searchParams.get('query');

    if (query) setSearchQuery(query);
  }, [searchParams]);

  return (
    <>
      <form style={{ width: '60%' }} onSubmit={handleSearch}>
        <FilledInput
          value={searchQuery}
          onChange={handleSearchQuery}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" />
            </InputAdornment>
          }
          placeholder="Search here"
          hiddenLabel
          sx={{ display: { xs: 'none', sm: 'flex' }, bgcolor: 'background.paper' }}
          fullWidth
        />
      </form>

      <IconButton onClick={openSearchDialog} sx={{ display: { sm: 'none', xs: 'inherit' } }}>
        <Iconify icon="eva:search-fill" />
      </IconButton>

      <Dialog
        fullWidth
        sx={{ '& .MuiDialog-container': { alignItems: 'flex-start' } }}
        open={searchDialog.value}
        onClose={closeSearchDialog}
      >
        <form style={{ width: '100%' }} onSubmit={handleSearch}>
          <FilledInput
            value={searchQuery}
            onChange={handleSearchQuery}
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
    </>
  );
}

export default memo(Searchbar);
