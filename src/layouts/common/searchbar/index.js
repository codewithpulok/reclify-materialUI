import { memo, useCallback, useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';

import { Dialog, FilledInput, InputAdornment } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import Iconify from 'src/components/common/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
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
      router.push(`${basePath}/?${createQueryString('query', searchQuery, searchParams)}`);
      closeSearchDialog();
    },
    [basePath, closeSearchDialog, router, searchParams, searchQuery]
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

Searchbar.propTypes = Props;

export default memo(Searchbar);
