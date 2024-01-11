import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { regions } from 'src/assets/data';
import { users } from 'src/assets/dummy/users';
import FormProvider from 'src/components/common/hook-form/form-provider';
import { getIconify } from 'src/components/common/iconify/utilities';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

const SearchbarFiltersProps = {
  /** @type {(values) => {}} */
  onFilterApply: PropTypes.func.isRequired,
  /** @type {string[]} */
  defaultRegions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** @type {string[]} */
  defaultUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

/**
 * @param {SearchbarFiltersProps} props
 * @returns {JSX.Element}
 */
const SearchbarFilters = (props) => {
  const { onFilterApply, defaultRegions = [], defaultUsers = [] } = props;
  const auth = useAppSelector(selectAuth);

  const methods = useForm({ defaultValues: { regions: [], users: [] } });
  const { handleSubmit, watch, setValue, reset } = methods;

  const regionsValue = watch('regions');
  const usersValue = watch('users');

  const setRegionsValues = useCallback(
    (include, value) => {
      let newValues = [...regionsValue];

      // if checked then push the user into filter
      if (include) {
        newValues.push(value);
      } else {
        // if not then remove from filter
        newValues = regionsValue.filter((p) => p !== value);
      }

      setValue('regions', newValues);
    },
    [regionsValue, setValue]
  );
  const setUsersValues = useCallback(
    (include, value) => {
      let newValues = [...usersValue];

      // if checked then push the user into filter
      if (include) {
        newValues.push(value);
      } else {
        // if not then remove from filter
        newValues = usersValue.filter((p) => p !== value);
      }

      setValue('users', newValues);
    },
    [setValue, usersValue]
  );

  const onSubmit = (values) => {
    onFilterApply(values);
  };

  const isMatched = useMemo(() => {
    const regionMatch =
      defaultRegions.every((region, index) => regionsValue[index] === region) &&
      defaultRegions.length === regionsValue.length;
    const usersMatch =
      defaultUsers.every((user, index) => usersValue[index] === user) &&
      defaultUsers.length === usersValue.length;

    return regionMatch && usersMatch;
  }, [defaultRegions, defaultUsers, regionsValue, usersValue]);

  useEffect(() => {
    const changes = {};

    if (defaultRegions instanceof Array) changes.regions = defaultRegions;
    if (defaultUsers instanceof Array) changes.users = defaultUsers;

    if (Object.keys(changes).length) reset(changes);
  }, [defaultRegions, defaultUsers, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Stack direction="row" justifyContent="space-between" mb={2} alignItems="center">
          <Typography variant="overline" color="text.secondary">
            Filters
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            endIcon={getIconify('solar:alt-arrow-right-linear', 18)}
            disabled={isMatched}
          >
            Apply
          </Button>
        </Stack>

        <Accordion sx={{ width: '100%' }}>
          <AccordionSummary
            expandIcon={getIconify('solar:alt-arrow-down-line-duotone')}
            aria-controls="regions"
            id="regions"
          >
            <Typography>Regions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {regions.map((region) => (
                <FormControlLabel
                  label={region.name}
                  control={
                    <Checkbox
                      value={region.code}
                      checked={regionsValue.includes(region.code)}
                      onChange={(e) => setRegionsValues(e.target.checked, e.target.value)}
                    />
                  }
                  key={region.code}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        {auth?.user?.userType === 'admin' ? (
          <Accordion sx={{ width: '100%' }}>
            <AccordionSummary
              expandIcon={getIconify('solar:alt-arrow-down-line-duotone')}
              aria-controls="users"
              id="users"
            >
              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {users.map((user) => (
                  <FormControlLabel
                    label={user.displayName}
                    control={
                      <Checkbox
                        value={user.id}
                        checked={usersValue.includes(String(user.id))}
                        onChange={(e) => setUsersValues(e.target.checked, e.target.value)}
                      />
                    }
                    key={user.id}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ) : null}
      </Stack>
    </FormProvider>
  );
};

SearchbarFilters.propTypes = SearchbarFiltersProps;

export default SearchbarFilters;
