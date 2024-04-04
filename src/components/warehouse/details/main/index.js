'use client';

import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
// local components
import { ReviewList } from 'src/components/review/lists';
import { useResponsive } from 'src/hooks/use-responsive';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import WarehouseHeader from '../common/details-header';
import WarehosueDetailsMain from '../common/details-main';
import WarehouseDetailsSidebar from '../common/details-sidebar';

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
function WarehouseDetailsMain(props) {
  const { warehouse, reviews } = props;
  const appearance = useAppearance();
  const { user } = useAppSelector(selectAuth);

  const mdUp = useResponsive('up', 'md');

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'xl'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WarehouseHeader warehouse={warehouse} />
        </Grid>
        <Grid item xs={12} md={7}>
          <WarehosueDetailsMain
            seller={warehouse?.seller}
            warehouse={warehouse}
            reviews={reviews}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          {/* show sidebar content in tab mode & hide in mobile mode */}
          {mdUp && (
            <WarehouseDetailsSidebar seller={warehouse?.seller} warehouse={warehouse}>
              <ReviewList
                reviews={reviews}
                canAddNewReview={user && user.userType === 'customer'}
                warehouseId={warehouse.id}
              />
            </WarehouseDetailsSidebar>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

WarehouseDetailsMain.propTypes = Props;

export default WarehouseDetailsMain;
