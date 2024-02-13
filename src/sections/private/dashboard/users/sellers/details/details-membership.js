import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { PlanCard } from 'src/components/user-settings/cards';
import DetailsMembershipHistory from './details-membership-history';

const Props = {
  /** @type {Plan} */
  currentPlan: PropTypes.object.isRequired,
  /** @type {Membership[]} */
  membershipHistory: PropTypes.arrayOf(PropTypes.object),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsMembership = (props) => {
  const { currentPlan, membershipHistory = [] } = props;
  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Current Plan" />
          <CardContent>
            <PlanCard plan={currentPlan} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Plan History" />
          <CardContent>
            <DetailsMembershipHistory membershipHistory={membershipHistory} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

DetailsMembership.propTypes = Props;

export default DetailsMembership;
