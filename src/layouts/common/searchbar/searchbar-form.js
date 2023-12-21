import { IconButton, InputAdornment, InputBase } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from 'src/components/common/iconify';

const SearchbarFormProps = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

/**
 * @param {SearchbarFormProps} props
 * @returns {JSX.Element}
 */
const SearchbarForm = (props) => {
  const { value, onSearch, onValueChange } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={onSubmit}>
      <InputBase
        fullWidth
        autoFocus
        placeholder="Search..."
        value={value}
        onChange={onValueChange}
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        endAdornment={
          <IconButton type="submit" disabled={!value}>
            <Iconify icon="solar:arrow-right-outline" width={24} />
          </IconButton>
        }
        inputProps={{
          sx: { typography: 'h6' },
        }}
      />
    </form>
  );
};

SearchbarForm.propTypes = SearchbarFormProps;

export default SearchbarForm;
