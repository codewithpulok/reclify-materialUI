'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * @param {import('react-slick').Settings} props
 * @returns
 */
export default function useCarousel(props) {
  const theme = useTheme();

  /** @type {import('react').Ref<import('react-slick').default>} */
  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(props?.initialSlide || 0);
  const [currentSlidesToShow, setCurrentSlidesToShow] = useState(props?.slidesToShow || 1);

  const [nav, setNav] = useState(undefined);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const rtl = theme.direction === 'rtl';

  const carouselSettings = {
    arrows: false,
    dots: !!props?.customPaging,
    rtl,
    beforeChange: (current, next) => setCurrentIndex(next),
    ...props,
    fade: !!(props?.fade && !rtl),
  };

  const onSetNav = useCallback(() => {
    if (carouselRef.current) {
      setNav(carouselRef.current);
    }
  }, []);

  const onPrev = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.slickPrev();
    }
  }, []);

  const onNext = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  }, []);

  const onTogo = useCallback((index) => {
    if (carouselRef.current) {
      carouselRef.current.slickGoTo(index);
    }
  }, []);

  // handle current slide show update
  useEffect(() => {
    if (carouselRef?.current?.state && props?.responsive?.length) {
      const currentBreakpoint = carouselRef.current.state?.breakpoint; // could be null or undefined
      const currentBreakpointData = currentBreakpoint
        ? props.responsive.find((r) => r.breakpoint === currentBreakpoint)
        : undefined;

      if (currentBreakpointData?.settings?.slidesToShow !== undefined)
        setCurrentSlidesToShow(currentBreakpointData.settings?.slidesToShow);
    }
  }, [carouselRef, props]);

  useEffect(() => {
    if (carouselRef?.current) {
      const dataLength = carouselRef.current?.props?.children?.length || 0;
      const conditon = currentIndex + currentSlidesToShow < dataLength;

      setHasNext(conditon);
    }
  }, [currentSlidesToShow, carouselRef, currentIndex]);

  useEffect(() => setHasPrev(currentIndex !== 0), [currentIndex]);

  return {
    nav,
    carouselRef,
    currentIndex,
    carouselSettings,
    currentSlidesToShow,
    hasNext,
    hasPrev,
    //
    onPrev,
    onNext,
    onTogo,
    onSetNav,
    //
    setNav,
    setCurrentIndex,
  };
}
