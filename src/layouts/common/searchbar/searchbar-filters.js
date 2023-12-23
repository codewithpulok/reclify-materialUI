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
import { regions } from 'src/assets/data';
import { users } from 'src/assets/dummy/users';
import { useAuthContext } from 'src/auth/hooks';
import { getIconify } from 'src/components/common/iconify/utilities';

const SearchbarFiltersProps = {
  /** @type {string[]} */
  selectedRegions: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** @type {string[]} */
  selectedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** @type {(include: boolean, value: string) => {}} */
  onChangeRegions: PropTypes.func.isRequired,
  /** @type {(include: boolean, value: string) => {}} */
  onChangeUsers: PropTypes.func.isRequired,
  onFilterApply: PropTypes.func.isRequired,
};

/**
 * @param {SearchbarFiltersProps} props
 * @returns {JSX.Element}
 */
const SearchbarFilters = (props) => {
  const auth = useAuthContext();
  const { selectedRegions, selectedUsers, onChangeRegions, onChangeUsers, onFilterApply } = props;

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" mb={2} alignItems="center">
        <Typography variant="overline" color="text.secondary">
          Filters
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onFilterApply}
          endIcon={getIconify('solar:alt-arrow-right-linear', 18)}
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
                    checked={selectedRegions.includes(region.code)}
                    onChange={(e) => onChangeRegions(e.target.checked, e.target.value)}
                  />
                }
                key={region.code}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      {auth?.user?.role === 'admin' ? (
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
                      checked={selectedUsers.includes(String(user.id))}
                      onChange={(e) => onChangeUsers(e.target.checked, e.target.value)}
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
  );
};

SearchbarFilters.propTypes = SearchbarFiltersProps;

export default SearchbarFilters;
