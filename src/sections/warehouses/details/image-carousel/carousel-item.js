'use client';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import { MotionContainer, varFade } from 'src/components/common/animate';
import Image from 'src/components/common/image';

const ItemProps = {
  active: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const CarouselItem = (props) => {
  const { item, active } = props;
  const { coverUrl, title } = item;

  const theme = useTheme();

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
          <Link color="inherit" underline="none">
            <Typography variant="h5" noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>
      </Stack>

      {renderImg}
    </MotionContainer>
  );
};

CarouselItem.propTypes = ItemProps;

export default CarouselItem;
