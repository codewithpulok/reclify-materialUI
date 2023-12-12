import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { ICONS } from './config-card';

const WarehouseCard = ({ id, name, location, image, onDelete }) => {
  return (
    <Card
      className="card"
      sx={{
        ':hover .actions': {
          opacity: 1,
        },
      }}
    >
      <CardMedia image={image} alt={name} sx={{ height: 200 }} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
      <Box
        className="actions"
        sx={{
          position: 'absolute',
          top: 5,
          right: 4,
          bgcolor: 'Background',
          borderRadius: 5,
          opacity: 0,
          transition: '0.3s',
        }}
      >
        <Link href={`/warehouse/${id}`}>
          <IconButton size="small" color="primary">
            {ICONS.view}
          </IconButton>
        </Link>
        <IconButton size="small" color="error" onClick={onDelete}>
          {ICONS.delete}
        </IconButton>
      </Box>
    </Card>
  );
};

export default WarehouseCard;
