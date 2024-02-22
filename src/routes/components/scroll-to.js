import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import useHash from 'src/hooks/use-hash';
import { HEADER } from 'src/layouts/config-layout';

const Props = { id: PropTypes.string };

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ScrollTo = (props) => {
  const { id } = props;
  const ref = useRef(null);
  const hash = useHash();

  useEffect(() => {
    if (!!ref?.current && id && hash) {
      if (`#${id}` === hash) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [id, hash, ref]);

  return <div ref={ref} id={id} style={{ scrollMarginTop: `${HEADER.H_DESKTOP + 20}px` }} />;
};

ScrollTo.propTypes = Props;

export default ScrollTo;
