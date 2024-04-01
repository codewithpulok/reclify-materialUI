import { Card, CardHeader, Grid, Pagination, Stack } from '@mui/material';
// local components
import PropTypes from 'prop-types';
import { ServiceCard } from 'src/components/service/cards';
import usePagination from 'src/hooks/use-pagination';

const Props = {
  /** @type {Service[]} */
  services: PropTypes.arrayOf(PropTypes.object),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsServices = (props) => {
  const { services = [] } = props;

  // app states
  const { currentData, currentPage, goTo, totalPages } = usePagination(services, 6);

  return (
    <Card>
      <CardHeader title="Services" />
      <Stack my={3} sx={{ px: { xs: 1.5, sm: 3 } }}>
        <Grid container spacing={2.5}>
          {currentData.map((service) => (
            <Grid item key={service.id} xs={12} sm={6} md={4}>
              <ServiceCard key={service.id} service={service} />
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
      </Stack>
    </Card>
  );
};

DetailsServices.propTypes = Props;

export default DetailsServices;
