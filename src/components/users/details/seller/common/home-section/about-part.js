import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 *
 * @param {AboutPart.propTypes} props
 * @returns {JSX.Element}
 */
const AboutPart = (props) => {
  const { user } = props;

  return (
    <Card>
      <CardHeader title="About Provider:" />
      <CardContent>
        <Typography>{user?.about}</Typography>
      </CardContent>
    </Card>
  );
};

AboutPart.propTypes = {
  /** @type {User} */
  user: PropTypes.object,
};

export default AboutPart;
