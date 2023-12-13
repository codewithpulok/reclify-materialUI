import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const WarehouseDescriptionProps = {
  description: PropTypes.string.isRequired,
};

const WarehouseDescription = ({ description }) => (
  <>
    <Typography
      variant="h5"
      sx={{ borderBottom: '1px solid', borderColor: 'ActiveBorder' }}
      pb={0.5}
      mb={1}
    >
      Description
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </>
);

WarehouseDescription.propTypes = WarehouseDescriptionProps;

export default WarehouseDescription;
