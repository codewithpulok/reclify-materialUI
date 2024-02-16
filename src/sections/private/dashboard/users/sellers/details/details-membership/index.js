import { Card, CardContent, CardHeader, Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import MembershipCurrent from './membership-current';
import MembershipCustom from './membership-custom';
import MembershipHistory from './membership-history';

// ----------------------------------------------------------------------

const Props = {
  /** @type {PlanId} */
  currentPlanId: PropTypes.string,
  /** @type {Membership[]} */
  membershipHistory: PropTypes.arrayOf(PropTypes.object),
};

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsMembership = (props) => {
  const { currentPlanId, membershipHistory = [] } = props;

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={4}>
        <Stack spacing={1.5}>
          <MembershipCustom />
          <MembershipCurrent currentPlanId={currentPlanId} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Plan History" />
          <CardContent>
            <MembershipHistory membershipHistory={membershipHistory} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

DetailsMembership.propTypes = Props;

export default DetailsMembership;
