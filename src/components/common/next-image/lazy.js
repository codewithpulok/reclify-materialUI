import { forwardRef } from 'react';
import NextImage from './core';

const NextLazyImage = forwardRef(
  (
    /** @type {import('next/image').ImageProps} */
    props,
    ref
  ) => (
    <NextImage
      {...props}
      ref={ref}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8PxMAAp0BmiC7I60AAAAASUVORK5CYII="
    />
  )
);

NextLazyImage.propTypes = {};

export default NextLazyImage;
