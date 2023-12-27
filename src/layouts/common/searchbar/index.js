import { memo, useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';
import { useResponsive } from 'src/hooks/use-responsive';

import { useRouter, useSearchParams } from 'next/navigation';
import Iconify from 'src/components/common/iconify';
import Label from 'src/components/common/label';
import Scrollbar from 'src/components/common/scrollbar';
import { paths } from 'src/routes/paths';
import { createQueryString } from 'src/utils/query';
import SearchbarFilters from './searchbar-filters';
import SearchbarForm from './searchbar-form';

const BASE_PATH = paths.dashboard.listing;

// ----------------------------------------------------------------------

function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const theme = useTheme();
  const search = useBoolean();
  const lgUp = useResponsive('up', 'lg');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleClose = useCallback(() => {
    search.onFalse();
  }, [search]);

  const handleKeyDown = (event) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  const handleSearchQuery = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const renderButton = (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={search.onTrue}>
        <Iconify icon="eva:search-fill" />
      </IconButton>

      {lgUp && <Label sx={{ px: 0.75, fontSize: 12, color: 'text.secondary' }}>⌘K</Label>}
    </Stack>
  );

  const handleSearch = useCallback(() => {
    console.log('Searched For: ', searchQuery);
    router.push(`${BASE_PATH}/?${createQueryString('query', searchQuery, searchParams)}`);
    search.onFalse();
  }, [router, search, searchParams, searchQuery]);

  // handle filter
  const handleFilter = useCallback(
    (values) => {
      const selectedRegionsString = values.regions.join(',');
      const selectedUsersString = values.users.join(',');

      let currentSearchParams = searchParams.toString();

      if (values.regions.length)
        currentSearchParams = createQueryString(
          'regions',
          selectedRegionsString,
          currentSearchParams
        );

      if (values.users.length)
        currentSearchParams = createQueryString('users', selectedUsersString, currentSearchParams);

      router.push(`${BASE_PATH}/?${currentSearchParams}`);
      search.onFalse();
    },
    [router, search, searchParams]
  );

  // assign keydown events
  useEventListener('keydown', handleKeyDown);

  // update states after refresh
  useEffect(() => {
    if (search.value) {
      const query = searchParams.get('query');
      const users = searchParams.get('users');
      const regions = searchParams.get('regions');

      if (query) setSearchQuery(query);
      if (users) setSelectedUsers(users.split(','));
      if (regions) setSelectedRegions(regions.split(','));
    } else {
      setSearchQuery('');
      setSelectedUsers([]);
      setSelectedRegions([]);
    }
  }, [searchParams, search.value]);

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{
          sx: {
            mt: 15,
            overflow: 'unset',
          },
        }}
        sx={{
          [`& .${dialogClasses.container}`]: {
            alignItems: 'flex-start',
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
          <SearchbarForm
            value={searchQuery}
            onValueChange={handleSearchQuery}
            onSearch={handleSearch}
          />
        </Box>

        <Scrollbar sx={{ p: 3, pt: 2, height: 400 }}>
          <SearchbarFilters
            defaultRegions={selectedRegions}
            defaultUsers={selectedUsers}
            onFilterApply={handleFilter}
          />
        </Scrollbar>
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
