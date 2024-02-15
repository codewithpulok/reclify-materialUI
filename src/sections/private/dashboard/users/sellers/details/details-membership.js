import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { useEffect } from 'react';
import { ErrorState, LoadingState } from 'src/components/common/custom-state';
import { PlanCard } from 'src/components/user-settings/cards';
import { usePlanGetQuery } from 'src/redux-toolkit/services/planApi';
import DetailsMembershipHistory from './details-membership-history';

const Props = {
  /** @type {PlanId} */
  currentPlanId: PropTypes.string,
  /** @type {Membership[]} */
  membershipHistory: PropTypes.arrayOf(PropTypes.object),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const DetailsMembership = (props) => {
  const { currentPlanId, membershipHistory = [] } = props;

  // api state
  const planResponse = usePlanGetQuery(currentPlanId, { skip: !currentPlanId });

  // fetch plan details based on plan id
  useEffect(() => {
    if (currentPlanId) {
      planResponse.refetch(currentPlanId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlanId]);

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Current Plan" />
          <CardContent>
            {planResponse?.isLoading && <LoadingState />}
            {!planResponse?.isLoading && planResponse.isError && <ErrorState />}
            {!planResponse?.isLoading && planResponse.isSuccess && (
              <PlanCard plan={planResponse?.data?.results} />
            )}
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
