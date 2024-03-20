import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MotionContainer, MotionDiv, varFade } from 'src/components/common/animate';

import { Box } from '@mui/material';
import { NextLazyImage } from 'src/components/common/next-image';
import { PLACEHOLDER_NEWS_COVER } from 'src/config-global';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { grey } from 'src/theme/palette';
import { alpha } from 'src/utils/color';

const Props = {
  active: PropTypes.bool,
  item: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const NewsFeaturedCard = (props) => {
  const { item, active } = props;

  const { coverUrl, title, description } = item;

  const renderImg = (
    <Box
      sx={{
        position: 'relative',
        width: 1,
        height: {
          xs: 280,
          xl: 320,
        },
      }}
    >
      <NextLazyImage
        alt={title}
        src={coverUrl || PLACEHOLDER_NEWS_COVER}
        fill
        style={{ width: '100%', height: '100%' }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          background: `linear-gradient(to bottom, ${alpha(grey['900'], 0)} 0%, ${alpha(
            grey['900'],
            0.8
          )} 75%)`,
        }}
      />
    </Box>
  );

  return (
    <MotionContainer action animate={active} sx={{ position: 'relative' }}>
      <Stack
        spacing={1}
        sx={{
          p: 3,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <MotionDiv variants={varFade().inRight}>
          <Typography variant="overline" sx={{ color: 'primary.light' }}>
            Featured News
          </Typography>
        </MotionDiv>

        <MotionDiv variants={varFade().inRight}>
          <Link
            color="inherit"
            underline="none"
            component={RouterLink}
            href={paths.news.details(item?.id)}
          >
            <Typography variant="h5" noWrap>
              {title}
            </Typography>
          </Link>
        </MotionDiv>

        <MotionDiv variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </MotionDiv>
      </Stack>

      {renderImg}
    </MotionContainer>
  );
};

NewsFeaturedCard.propTypes = Props;
export default NewsFeaturedCard;
