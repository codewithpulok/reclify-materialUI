import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { ServiceCard, ServiceCardSkeleton } from 'src/components/service/cards';

const Props = {
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  /** @type {Service[]} */
  data: PropTypes.arrayOf(PropTypes.object),
  totalPages: PropTypes.number,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RenderServices = (props) => {
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
      <Grid container spacing={2}>
        {data.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4}>
            <ServiceCard key={service.id} service={service} />
          </Grid>
        ))}
      </Grid>
    );
  }

  // loading state
  return Array.from(Array(3).keys()).map((i) => (
    <Grid key={i} item xs={12} sm={6} md={4}>
      <ServiceCardSkeleton />
    </Grid>
  ));
};

RenderServices.propTypes = Props;

export default RenderServices;
