'use client';

import { useScroll } from 'framer-motion';
import ScrollProgress from 'src/components/common/scroll-progress';

const HomeProgress = (props) => {
  const { scrollYProgress } = useScroll();
  return <ScrollProgress scrollYProgress={scrollYProgress} />;
};

HomeProgress.propTypes = {};

export default HomeProgress;
