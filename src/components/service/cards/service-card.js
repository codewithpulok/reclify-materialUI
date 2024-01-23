import { Box, Card, CardActionArea, CardContent, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
// local components
import Image from 'src/components/common/image';
import { paths } from 'src/routes/paths';

const Props = {
  /** @type {Service} */
  service: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};
/**
 * Card for showing service data
 * @param {Props} props
 */
const ServiceCard = (props) => {
  const router = useRouter();
  const { service, sx = {} } = props;
  const thumbnail = service?.photos?.[0]?.link || 'https://placehold.co/450x318?text=Not+Found';

  return (
    <Card
      className="card"
      sx={{
        ...sx,
      }}
    >
      <CardActionArea onClick={() => router.push(paths.dashboard.services.details(service.id))}>
        <Box width="100%" sx={{ position: 'relative' }}>
          <Image src={thumbnail} ratio="16/9" />
        </Box>
        <CardContent sx={{ position: 'relative' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {service.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ServiceCard.propTypes = Props;

export default ServiceCard;

// Seketon
export const ServiceCardSkeleton = () => (
  <Card>
    <Skeleton width="100%" variant="rounded">
      <Image ratio="16/9" />
    </Skeleton>

    <CardContent>
      <Typography gutterBottom variant="h5">
        <Skeleton />
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
        }}
      >
        <Skeleton />
      </Typography>
    </CardContent>
  </Card>
);