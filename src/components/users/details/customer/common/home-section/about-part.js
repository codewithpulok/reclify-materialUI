import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * @param {AboutPart.propTypes} props
 * @returns {JSX.Element}
 */
const AboutPart = (props) => {
  const { about } = props;

  return (
    <Card>
      <CardHeader title="About Merchant:" />
      <CardContent>
        <Typography>{about}</Typography>
      </CardContent>
    </Card>
  );
};

AboutPart.propTypes = {
  about: PropTypes.string,
};

export default AboutPart;
