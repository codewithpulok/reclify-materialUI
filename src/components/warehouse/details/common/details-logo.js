import PropTypes from 'prop-types';
import Image from 'src/components/common/image';

/**
 * @param {DetailsLogo.propTypes} props
 * @returns {JSX.Element}
 */
const DetailsLogo = (props) => {
  const { logo } = props;

  return <Image src={logo} alt="Company Logo" sx={{ width: '100%' }} />;
};

DetailsLogo.propTypes = {
  logo: PropTypes.string,
};

export default DetailsLogo;
