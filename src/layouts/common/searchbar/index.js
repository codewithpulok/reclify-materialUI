import { memo, useCallback, useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';

import { Dialog, FilledInput, InputAdornment } from '@mui/material';
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
  const searchParams = useSearchParams();

  // app state
  const [searchQuery, setSearchQuery] = useState('');
  // dialog state
  const searchDialog = useDialog();
  const filterDialog = useDialog();

  // handle query field change
  const handleQueryChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  // handle search submit
  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('Searched For: ', searchQuery);
      router.push(`${basePath}/?${createQueryString('query', searchQuery, searchParams)}`);
      searchDialog.onClose();
    },
    [basePath, searchDialog, router, searchParams, searchQuery]
  );

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
              <IconButton onClick={filterDialog.onOpen}>
                <Iconify icon="lets-icons:filter" />
              </IconButton>
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

      <SearchFilterDialog open={filterDialog.open} onClose={filterDialog.onClose} />
    </>
  );
}

Searchbar.propTypes = Props;

export default memo(Searchbar);
