import { memo, useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/common/iconify';
import Label from 'src/components/common/label';
import Scrollbar from 'src/components/common/scrollbar';
import SearchbarForm from './searchbar-form';

// ----------------------------------------------------------------------

function Searchbar() {
  const theme = useTheme();

  const search = useBoolean();

  const lgUp = useResponsive('up', 'lg');

  const [searchQuery, setSearchQuery] = useState('');

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

  useEventListener('keydown', handleKeyDown);

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
    search.onFalse();
  }, [search, searchQuery]);

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

        <Scrollbar sx={{ p: 3, pt: 2, height: 400 }} />
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
