'use client';

import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { getRatio } from './utils';

// ----------------------------------------------------------------------

const ImageProps = {
  afterLoad: PropTypes.func,
  alt: PropTypes.string,
  beforeLoad: PropTypes.func,
  delayMethod: PropTypes.string,
  delayTime: PropTypes.number,
  isLogo: PropTypes.bool,
  disabledEffect: PropTypes.bool,
  effect: PropTypes.string,
  overlay: PropTypes.string,
  /** @type {'4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1'} */
  ratio: PropTypes.oneOf(['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1']),
  scrollPosition: PropTypes.object,
  src: PropTypes.string,
  /** @type {SxProps} */
  sx: PropTypes.object,
  imageSx: PropTypes.object,
  threshold: PropTypes.number,
  useIntersectionObserver: PropTypes.bool,
  visibleByDefault: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  wrapperProps: PropTypes.object,
  placeholder: PropTypes.element,
};

/**
 * @type {React.FC<ImageProps>}
 */
const Image = forwardRef((props, ref) => {
  const {
    ratio,
    overlay,
    disabledEffect = false,
    isLogo = false,
    //
    alt,
    src,
    afterLoad,
    delayTime,
    threshold,
    beforeLoad,
    delayMethod,
    placeholder,
    wrapperProps,
    scrollPosition,
    effect = 'blur',
    visibleByDefault,
    wrapperClassName,
    useIntersectionObserver,
    sx,
    imageSx,
    ...other
  } = props;
  const theme = useTheme();

  const overlayStyles = !!overlay && {
    '&:before': {
      content: "''",
      top: 0,
      left: 0,
      width: 1,
      height: 1,
      zIndex: 1,
      position: 'absolute',
      background: overlay || alpha(theme.palette.grey[900], 0.48),
    },
  };

  const content = (
    <Box
      component={LazyLoadImage}
      alt={alt}
      src={src}
      afterLoad={afterLoad}
      delayTime={delayTime}
      threshold={threshold}
      beforeLoad={beforeLoad}
      delayMethod={delayMethod}
      placeholder={placeholder}
      wrapperProps={wrapperProps}
      scrollPosition={scrollPosition}
      visibleByDefault={visibleByDefault}
      effect={disabledEffect ? undefined : effect}
      useIntersectionObserver={useIntersectionObserver}
      wrapperClassName={wrapperClassName || 'component-image-wrapper'}
      placeholderSrc={disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg'}
      sx={{
        width: 1,
        height: 1,
        objectFit: isLogo ? 'contain' : 'cover',
        verticalAlign: 'bottom',
        ...(!!ratio && {
          top: 0,
          left: 0,
          position: 'absolute',
        }),
        ...imageSx,
      }}
    />
  );

  return (
    <Box
      ref={ref}
      component="span"
      className="component-image"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        verticalAlign: 'bottom',
        display: 'inline-block',
        ...(!!ratio && {
          width: 1,
        }),
        '& span.component-image-wrapper': {
          width: 1,
          height: 1,
          verticalAlign: 'bottom',
          backgroundSize: 'cover !important',
          ...(!!ratio && {
            pt: getRatio(ratio),
          }),
        },
        ...overlayStyles,
        ...sx,
      }}
      {...other}
    >
      {content}
    </Box>
  );
});

Image.propTypes = ImageProps;

export default Image;
