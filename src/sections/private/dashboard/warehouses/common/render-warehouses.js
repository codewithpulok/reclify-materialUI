import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { EmptyState, ErrorState } from 'src/components/common/custom-state';
import { WarehouseCard, WarehouseCardSkeleton } from 'src/components/warehouse/cards';

const Props = {
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  /** @type {Warehouse[]} */
  data: PropTypes.arrayOf(PropTypes.object),
  totalPages: PropTypes.number,
  // optional
  /** @type {WarehouseCard.propTypes} */
  cardProps: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const RenderWarehouses = (props) => {
  const {
    data = [],
    isError,
    isFetching,
    isLoading,
    isSuccess,
    totalPages,
    cardProps = {},
  } = props;

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
        {data.map((warehouse) => (
          <Grid item key={warehouse?.id} xs={12} sm={6} md={4}>
            <WarehouseCard key={warehouse?.id} warehouse={warehouse} {...cardProps} />
          </Grid>
        ))}
      </Grid>
    );
  }

  // loading state
  return (
    <Grid container spacing={2}>
      {Array.from(Array(3).keys()).map((i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <WarehouseCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

RenderWarehouses.propTypes = Props;

export default RenderWarehouses;
