import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import Image from 'src/components/common/image';

// Seketon
const WarehouseCardSkeleton = () => (
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

export default WarehouseCardSkeleton;
