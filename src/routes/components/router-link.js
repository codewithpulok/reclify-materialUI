import Link from 'next/link';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

/** @type {React.FC<import('next/link').LinkProps>} */
const RouterLink = forwardRef(({ ...other }, ref) => <Link ref={ref} {...other} />);

export default RouterLink;
