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

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState('ALL');

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
    router.push(`${BASE_PATH}/?${createQueryString('query', searchQuery)}`);
    search.onFalse();
  }, [createQueryString, router, search, searchQuery]);

  // handle region filter updates
  const handleRegionChange = useCallback(
    (value) => {
      // update the state
      setSelectedRegion(value);
      // change path url
      router.push(`${BASE_PATH}/?${createQueryString('region', value === 'ALL' ? '' : value)}`);
    },
    [createQueryString, router]
  );

  // handle user filter updates
  const handleUserChange = useCallback(
    (value) => {
      // update the state
      setSelectedUser(value);
      // change path url
      router.push(`${BASE_PATH}?${createQueryString('user', value === 'ALL' ? '' : value)}`);
    },
    [createQueryString, router]
  );

  // assign keydown events
  useEventListener('keydown', handleKeyDown);

  // update states after refresh
  useEffect(() => {
    const query = searchParams.get('query');
    const user = searchParams.get('user');
    const region = searchParams.get('region');

    if (query) setSearchQuery(query);
    if (user) setSelectedUser(user);
    if (region) setSelectedRegion(region);
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

        <Scrollbar sx={{ p: 3, pt: 2, height: 200 }}>
          <SearchbarFilters
            selectedRegion={selectedRegion}
            selectedUser={selectedUser}
            setRegion={handleRegionChange}
            setUser={handleUserChange}
          />
        </Scrollbar>
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
