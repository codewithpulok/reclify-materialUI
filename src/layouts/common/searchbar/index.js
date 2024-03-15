// TODO: make it clear

import { memo, useCallback, useMemo } from 'react';

import IconButton from '@mui/material/IconButton';

import { Box, Dialog, InputAdornment, Tooltip } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { SearchFilterDialog } from 'src/components/common/custom-dialog';
import { RHFTextField } from 'src/components/common/hook-form';
import FormProvider from 'src/components/common/hook-form/form-provider';
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
  const defQuery = searchParams.get('query');
  const defType = searchParams.get('type');
  const defService = searchParams.get('serviceType');
  const defRegion = searchParams.get('region');
  const defSubtypes = searchParams.get('subtype');
  const parsedSubtypes = useMemo(() => {
    if (typeof defSubtypes !== 'string' || !defSubtypes?.length) return [];
    return defSubtypes?.split(',') || [];
  }, [defSubtypes]);

  // form states
  const defaultValues = useMemo(
    () => ({
      query: defQuery || '',
      type: defType || 'all',
      service: defService || '',
      region: defRegion || '',
      subtypes: parsedSubtypes || [],
    }),
    [defQuery, defRegion, defService, defType, parsedSubtypes]
  );
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  // dialog state
  const searchDialog = useDialog();
  const filterDialog = useDialog();

  // handle search
  const handleSearch = useCallback(
    (formValues) => {
      const { query, type, service, region, subtypes } = formValues;
      let queryString;

      if (type === 'all' || !type) {
        // search type is all or not exist then remove
        queryString = createQueryString('type', null, searchParams);
      } else {
        // if not then add
        queryString = createQueryString('type', type, searchParams);
      }

      // add service types in the query string
      queryString = createQueryString('serviceType', service || null, queryString);

      // add region in the query if exist
      queryString = createQueryString('region', region || null, queryString);

      // add subtype in the query if exist
      queryString = createQueryString('subtype', subtypes?.join(',') || null, queryString);

      // add if there is an query
      queryString = createQueryString('query', query || null, queryString);

      console.log('Searched For: ', formValues);
      router.push(`${basePath}/?${queryString}`);
      searchDialog.onClose();
    },
    [searchParams, router, basePath, searchDialog]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleSearch)}>
        <Box sx={{ width: '60%' }}>
          <RHFTextField
            name="query"
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Apply filters">
                    <IconButton onClick={filterDialog.onOpen}>
                      <Iconify icon="lets-icons:filter" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            placeholder="Search here"
            hiddenLabel
            sx={{ display: { xs: 'none', sm: 'flex' }, bgcolor: 'background.paper' }}
            fullWidth
          />
        </Box>

        <IconButton onClick={searchDialog.onOpen} sx={{ display: { sm: 'none', xs: 'inherit' } }}>
          <Iconify icon="eva:search-fill" />
        </IconButton>

        <Dialog
          fullWidth
          sx={{ '& .MuiDialog-container': { alignItems: 'flex-start' } }}
          open={searchDialog.open}
          onClose={searchDialog.onClose}
        >
          <Box style={{ width: '100%' }}>
            <RHFTextField
              variant="filled"
              name="query"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Apply filters">
                      <IconButton onClick={filterDialog.onOpen}>
                        <Iconify icon="lets-icons:filter" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              size="small"
              fullWidth
              hiddenLabel
            />
          </Box>
        </Dialog>

        <SearchFilterDialog
          open={filterDialog.open}
          onClose={filterDialog.onClose}
          handleSearch={handleSearch}
        />
      </FormProvider>
    </Box>
  );
}

Searchbar.propTypes = Props;

export default memo(Searchbar);
