'use client';

import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
// local components
import { getSellers } from 'src/assets/dummy/users';
import { useSettingsContext } from 'src/components/common/settings';
import WarehouseHeader from './warehouse-header';
import WarehosueDetailsMain from './warehouse-main';
import WarehouseDetailsSidebar from './warehouse-sidebar';

const Props = {
  /** @type {Warehouse} */
  warehouse: PropTypes.object.isRequired,
  /** @type {Review[]} */
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

/**
 * Warehouse Details page component
 * @param {Props} props
 * @returns {JSX.Element}
 */
function Content(props) {
  const { warehouse, reviews } = props;
  const settings = useSettingsContext();
  const seller = getSellers()[0]; // TODO: replace this with actual user

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <WarehouseHeader warehouse={warehouse} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <WarehosueDetailsMain seller={seller} warehouse={warehouse} reviews={reviews} />
        </Grid>
        <Grid item xs={12} md={5}>
          {/* show sidebar content in tab mode & hide in mobile mode */}
          <WarehouseDetailsSidebar
            seller={seller}
            warehouse={warehouse}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

Content.propTypes = Props;

export default Content;
