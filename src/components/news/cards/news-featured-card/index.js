import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { MotionContainer, varFade } from 'src/components/common/animate';

import Image from 'src/components/common/image';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

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
  const theme = useTheme();

  const { coverUrl, title, description } = item;

  const renderImg = (
    <Image
      alt={title}
      src={coverUrl}
      overlay={`linear-gradient(to bottom, ${alpha(theme.palette.grey[900], 0)} 0%, ${
        theme.palette.grey[900]
      } 75%)`}
      sx={{
        width: 1,
        height: {
          xs: 280,
          xl: 320,
        },
      }}
    />
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
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" sx={{ color: 'primary.light' }}>
            Featured News
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
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
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </Stack>

      {renderImg}
    </MotionContainer>
  );
};

NewsFeaturedCard.propTypes = Props;
export default NewsFeaturedCard;
