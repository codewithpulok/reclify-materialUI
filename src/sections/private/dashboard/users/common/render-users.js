import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { EmptyState, ErrorState, LoadingState } from 'src/components/common/custom-state';
import { CustomerCard, SellerCard } from 'src/components/users/cards';

const Props = {
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  /** @type {User[]} */
  data: PropTypes.arrayOf(PropTypes.object),
  totalPages: PropTypes.number,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RenderUsers = (props) => {
  const { data = [], isError, isFetching, isLoading, isSuccess, totalPages } = props;

  // error state
  if (!isLoading && !isFetching && isError) {
    return <ErrorState />;
  }

  // empty state
  if (!isLoading && !isFetching && isSuccess && totalPages === 0) {
    return <EmptyState />;
  }

  // success state
  if (!isLoading && !isFetching && isSuccess && data?.length) {
    return (
      <Grid container spacing={1}>
        {data.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            {user?.userType === 'seller' && (
              <SellerCard user={user} serviceCount={user?.serviceCount} />
            )}
            {user?.userType === 'customer' && (
              <CustomerCard user={user} totalTransactions={user?.transaction} />
            )}
          </Grid>
        ))}
      </Grid>
    );
  }

  // loading state
  return <LoadingState />;
};

RenderUsers.propTypes = Props;

export default RenderUsers;
