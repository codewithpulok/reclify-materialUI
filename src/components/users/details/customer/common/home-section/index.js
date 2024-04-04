import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
// local components
import AboutPart from './about-part';
import InfoPart from './info-part';
import SocialPart from './social-part';

// ----------------------------------------------------------------------

/**
 * @param {HomeSection.propTypes} props
 * @returns {JSX.Element}
 */
const HomeSection = (props) => {
  const { user } = props;

  return (
    <Grid container spacing={1.5}>
      <Grid xs={12} md={4}>
        <AboutPart about={user?.about} />
      </Grid>
      <Grid xs={12} md={4}>
        <InfoPart user={user} />
      </Grid>
      <Grid xs={12} md={4}>
        <SocialPart user={user} />
      </Grid>
    </Grid>
  );
};

HomeSection.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};
export default HomeSection;
