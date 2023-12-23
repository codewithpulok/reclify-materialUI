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

  const createQueryString = (name, value, queryString) => {
    const params = new URLSearchParams(queryString);
    params.set(name, value);

    return params.toString();
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
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

  // handle region filter updates
  const handleRegionsFilter = useCallback((include, value) => {
    setSelectedRegions((prev) => {
      let prevRegions = [...prev];

      // if checked then push the region into filter
      if (include) {
        prevRegions.push(value);
      } else {
        // if not then remove from filter
        prevRegions = prev.filter((p) => p !== value);
      }

      return prevRegions;
    });
  }, []);

  // handle user filter updates
  const handleUsersFilter = useCallback((include, value) => {
    setSelectedUsers((prev) => {
      let prevUsers = [...prev];

      // if checked then push the user into filter
      if (include) {
        prevUsers.push(value);
      } else {
        // if not then remove from filter
        prevUsers = prev.filter((p) => p !== value);
      }

      return prevUsers;
    });
  }, []);

  // handle filter
  const handleFilter = useCallback(() => {
    const selectedRegionsString = selectedRegions.join(',');
    const selectedUsersString = selectedUsers.join(',');

    let currentSearchParams = searchParams.toString();

    if (selectedRegions.length)
      currentSearchParams = createQueryString(
        'regions',
        selectedRegionsString,
        currentSearchParams
      );

    if (selectedRegions.length)
      currentSearchParams = createQueryString('users', selectedUsersString, currentSearchParams);

    console.log({ selectedRegionsString, selectedUsersString, currentSearchParams });

    router.push(`${BASE_PATH}/?${currentSearchParams}`);
    search.onFalse();
  }, [router, search, searchParams, selectedRegions, selectedUsers]);

  // assign keydown events
  useEventListener('keydown', handleKeyDown);

  // update states after refresh
  useEffect(() => {
    const query = searchParams.get('query');
    const users = searchParams.get('users');
    const regions = searchParams.get('regions');

    if (query) setSearchQuery(query);
    if (users) setSelectedUsers(users.split(','));
    if (regions) setSelectedRegions(regions.split(','));
  }, [searchParams]);

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
            selectedRegions={selectedRegions}
            selectedUsers={selectedUsers}
            onChangeRegions={handleRegionsFilter}
            onChangeUsers={handleUsersFilter}
            onFilterApply={handleFilter}
          />
        </Scrollbar>
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
