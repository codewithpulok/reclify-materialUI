import { Dialog, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------
const Props = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const SearchFilterDialog = (props) => {
  const { onClose, open } = props;
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Filter Search</DialogTitle>
    </Dialog>
  );
};

SearchFilterDialog.propTypes = Props;

export default SearchFilterDialog;
