import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import useAdminPath from 'src/hooks/use-admin-path';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

/**
 * @param {ViewMore.propTypes} props
 * @returns {JSX.Element}
 */
const ViewMore = (props) => {
  const { id } = props;
  const sellerPath = useAdminPath(paths.dashboard.users.seller, paths.users.seller);

  return (
    <Button
      LinkComponent={RouterLink}
      href={`${sellerPath(id)}#services`}
      variant="soft"
      color="primary"
    >
      View More
    </Button>
  );
};

ViewMore.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ViewMore;
