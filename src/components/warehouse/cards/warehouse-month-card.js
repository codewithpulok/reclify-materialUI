import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Props = {
  month: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseMonthCard = (props) => {
  const { month, isSelected, setSelected, isDark } = props;

  return (
    <Card
      onClick={() => setSelected(month)}
      sx={{
        borderRadius: 1,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: isSelected ? 'primary.main' : 'transparent',
        cursor: 'pointer',
        bgcolor: isDark ? 'background.neutral' : 'background.default',
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h3">{month}</Typography>
        <Typography variant="body2">Month</Typography>
      </CardContent>
    </Card>
  );
};

WarehouseMonthCard.propTypes = Props;
export default WarehouseMonthCard;
