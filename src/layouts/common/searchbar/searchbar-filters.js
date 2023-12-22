import { Chip, MenuItem, Select, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { regions } from 'src/assets/data';
import { users } from 'src/assets/dummy/users';
import { useAuthContext } from 'src/auth/hooks';

const SearchbarFiltersProps = {
  selectedRegion: PropTypes.string.isRequired,
  selectedUser: PropTypes.string.isRequired,

  setRegion: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

/**
 * @param {SearchbarFiltersProps} props
 * @returns {JSX.Element}
 */
const SearchbarFilters = (props) => {
  const auth = useAuthContext();
  const { selectedRegion, selectedUser, setRegion, setUser } = props;

  return (
    <Stack alignItems="flex-start">
      <Chip label="Filters" sx={{ mb: 2 }} color="success" variant="outlined" />

      <Stack
        sx={{ width: '100%' }}
        mb={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Region</Typography>
        <Select size="small" value={selectedRegion} onChange={(e) => setRegion(e.target.value)}>
          <MenuItem value="ALL">Not set</MenuItem>
          {regions.map((region) => (
            <MenuItem value={region.code} key={region.code}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {auth?.user?.role === 'admin' && (
        <Stack
          sx={{ width: '100%' }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>User</Typography>
          <Select size="small" value={selectedUser} onChange={(e) => setUser(e.target.value)}>
            <MenuItem value="ALL">Not set</MenuItem>
            {users.map((user) => (
              <MenuItem value={user.id} key={user.id}>
                {user.displayName}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}
    </Stack>
  );
};

SearchbarFilters.propTypes = SearchbarFiltersProps;

export default SearchbarFilters;
