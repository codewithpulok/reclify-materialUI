import { Pagination, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import usePagination from 'src/hooks/use-pagination';
import RenderServices from '../../services/common/render-services';
import RenderWarehouses from '../../warehouses/common/render-warehouses';

/**
 * @param {RenderTypeSearch.propTypes} props
 * @returns {JSX.Element}
 */
const RenderTypeSearch = (props) => {
  const { data, type, ...other } = props;

  const typeData = useMemo(() => {
    if (type === 'warehouse') return data?.warehouses || [];
    if (type === 'service') return data?.services || [];
    return [];
  }, [data?.services, data?.warehouses, type]);

  // logic state
  const { currentData, currentPage, goTo, totalPages } = usePagination(typeData);

  const renderHeader = (
    <Typography variant="h4">
      {type === 'warehouse' && 'Warehouses'}
      {type === 'service' && 'Services'}
    </Typography>
  );

  const renderList = (
    <>
      {type === 'warehouse' && (
        <RenderWarehouses data={currentData} totalPages={totalPages} {...other} />
      )}
      {type === 'service' && (
        <RenderServices data={currentData} totalPages={totalPages} {...other} />
      )}
    </>
  );

  return (
    <Stack spacing={3}>
      {renderHeader}
      {renderList}
      <Stack direction="row" justifyContent="center" mt={3} mb={1}>
        <Pagination
          count={totalPages}
          color="primary"
          size="small"
          page={currentPage}
          onChange={(_e, page) => goTo(page)}
        />
      </Stack>
    </Stack>
  );
};

RenderTypeSearch.propTypes = {
  /** @type {'warehouse' | 'service'} */
  type: PropTypes.string,
  data: PropTypes.shape({
    /** @type {Warehouse[]} */
    warehouses: PropTypes.array,
    /** @type {Service[]} */
    services: PropTypes.array,
  }),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
};

export default RenderTypeSearch;
