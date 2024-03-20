import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

/**
 * @param {TeamCard.propTypes} props
 * @returns {JSX.Element}
 */
const TeamCard = (props) => {
  const { name, bio, avatar } = props;
  return (
    <Card key={name} sx={{ pb: 1.5 }}>
      <CardContent sx={{ px: 1.5, pb: '0!important' }}>
        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
          {name}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
          {bio}
        </Typography>

        <Box sx={{ position: 'relative', aspectRatio: 1 }}>
          <Image
            alt={name}
            src={avatar}
            fill
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8PxMAAp0BmiC7I60AAAAASUVORK5CYII="
          />
        </Box>
      </CardContent>
    </Card>
  );
};

TeamCard.propTypes = {
  name: PropTypes.string,
  bio: PropTypes.string,
  avatar: PropTypes.string,
};

export default TeamCard;
