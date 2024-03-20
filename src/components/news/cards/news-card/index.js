import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { AvatarShape } from 'src/assets/illustrations';

import Image from 'next/image';
import { PLACEHOLDER_NEWS_COVER } from 'src/config-global';
import NewsCardContent from './card-content';

// ----------------------------------------------------------------------
const Props = {
  /** @type {NewsType} */
  post: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsCard = ({ post }) => {
  const { coverUrl, title, author } = post;

  return (
    <Card>
      <Box sx={{ position: 'relative', aspectRatio: 4 / 3, w: 1 }}>
        <AvatarShape
          sx={{
            left: 0,
            zIndex: 9,
            width: 88,
            height: 36,
            bottom: -16,
            position: 'absolute',
          }}
        />

        <Avatar
          alt={author.name}
          src={author.avatar}
          sx={{
            left: 24,
            zIndex: 9,
            bottom: -24,
            position: 'absolute',
          }}
        />

        <Image
          alt={title}
          src={coverUrl || PLACEHOLDER_NEWS_COVER}
          fill
          style={{ width: '100%', height: '100%' }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8PxMAAp0BmiC7I60AAAAASUVORK5CYII="
        />
      </Box>

      <NewsCardContent post={post} />
    </Card>
  );
};

NewsCard.propTypes = Props;

export default NewsCard;
