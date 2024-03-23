import { Card } from '@mui/material';
import PropTypes from 'prop-types';
import { NextLazyImage } from 'src/components/common/next-image';

/**
 * @param {DetailsLogo.propTypes} props
 * @returns {JSX.Element}
 */
const DetailsLogo = (props) => {
  const { logo } = props;

  return (
    <Card
      sx={{
        width: 1,
        aspectRatio: 16 / 9,
        position: 'relative',
        borderRadius: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'grey.300',
      }}
    >
      <NextLazyImage src={logo} alt="Company Logo" fill style={{ objectFit: 'contain' }} />
    </Card>
  );
};

DetailsLogo.propTypes = {
  logo: PropTypes.string,
};

export default DetailsLogo;
