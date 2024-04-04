'use client';

import { Card, CardHeader, Grid, Pagination, Stack } from '@mui/material';
// local components
import PropTypes from 'prop-types';
import { EmptyState } from 'src/components/common/custom-state';
import { WarehouseCard } from 'src/components/warehouse/cards';
import usePagination from 'src/hooks/use-pagination';

/**
 * @param {WarehouseSection.propTypes} props
 * @returns {JSX.Element}
 */
const WarehouseSection = (props) => {
  const { warehouses = [] } = props;

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(warehouses, 6);

  return (
    <Card>
      <CardHeader title="Warehouses" />
      <Stack my={3} sx={{ px: { xs: 1.5, sm: 3 } }}>
        {totalPages ? (
          <>
            <Grid container spacing={2.5}>
              {currentData.map((warehouse) => (
                <Grid item key={warehouse.id} xs={12} sm={6} md={4}>
                  <WarehouseCard key={warehouse.id} warehouse={warehouse} />
                </Grid>
              ))}
            </Grid>

            <Stack direction="row" justifyContent="center" mt={8} mb={3}>
              <Pagination
                count={totalPages}
                color="primary"
                size="small"
                page={currentPage}
                onChange={(_e, page) => goTo(page)}
              />
            </Stack>
          </>
        ) : (
          <EmptyState />
        )}
      </Stack>
    </Card>
  );
};

WarehouseSection.propTypes = {
  /** @type {Warehouse[]} */
  warehouses: PropTypes.arrayOf(PropTypes.object),
};

export default WarehouseSection;
