import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
// local components
import SocialPart from '../../../customer/common/home-section/social-part';
import AboutPart from './about-part';
import InfoPart from './info-part';

// ----------------------------------------------------------------------

/**
 * @param {HomeSection.propTypes} props
 * @returns {JSX.Element}
 */
const HomeSection = (props) => {
  const { user, firstChildren, secondChildren, thirdChildren } = props;

  return (
    <Grid container spacing={1.5}>
      <Grid xs={12} md={4}>
        <Stack spacing={1.5}>
          <AboutPart user={user} />
          {firstChildren}
        </Stack>
      </Grid>
      <Grid xs={12} md={4}>
        <Stack spacing={1.5}>
          <InfoPart user={user} />
          {secondChildren}
        </Stack>
      </Grid>
      <Grid xs={12} md={4}>
        <Stack spacing={1.5}>
          <SocialPart user={user} />
          {thirdChildren}
        </Stack>
      </Grid>
    </Grid>
  );
};

HomeSection.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
  firstChildren: PropTypes.node,
  secondChildren: PropTypes.node,
  thirdChildren: PropTypes.node,
};
export default HomeSection;
