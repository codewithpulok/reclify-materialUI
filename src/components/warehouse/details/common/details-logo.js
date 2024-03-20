import PropTypes from 'prop-types';
import Image from 'src/components/common/image';
import { WarehouseDetailsBox } from '../../box';

/**
 * @param {DetailsLogo.propTypes} props
 * @returns {JSX.Element}
 */
const DetailsLogo = (props) => {
  const { logo } = props;

  return (
    <WarehouseDetailsBox>
      <Image
        src={logo}
        alt="Company Logo"
        sx={{ width: '100%' }}
        imageSx={{ objectFit: 'contain!important' }}
        ratio="16/9"
      />
    </WarehouseDetailsBox>
  );
};

DetailsLogo.propTypes = {
  logo: PropTypes.string,
};

export default DetailsLogo;
