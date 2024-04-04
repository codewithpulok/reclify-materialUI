'use client';

import { Card, CardContent, CardHeader, Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
// local components
import { MembershipUser } from 'src/components/common/custom-table';
import MembershipCurrent from './membership-current';
import MembershipCustom from './membership-custom';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

/**
 * @param {MembershipSection.propTypes} props
 * @returns {JSX.Element}
 */
const MembershipSection = (props) => {
  const { user } = props;

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} md={4}>
        <Stack spacing={1.5}>
          <MembershipCustom userId={user?.id} />
          <MembershipCurrent currentPlan={user?.membership?.currentPlan} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Plan History" />
          <CardContent>
            <MembershipUser data={user?.membership?.planHistory || []} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

MembershipSection.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default MembershipSection;
