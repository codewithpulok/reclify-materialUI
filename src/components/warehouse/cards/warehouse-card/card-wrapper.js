'use client';

import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import useAuthPath from 'src/hooks/use-auth-path';
import { paths } from 'src/routes/paths';

/**
 * @param {CardWrapper.propTypes} props
 * @returns {JSX.Element}
 */
const CardWrapper = (props) => {
  const { children, warehouse } = props;

  const router = useRouter();

  const detailsPath = useAuthPath(
    paths.dashboard.warehouses.details(warehouse?.id),
    paths.warehouses.details(warehouse?.id)
  );

  return (
    <CardActionArea sx={{ bgcolor: 'background.neutral' }} onClick={() => router.push(detailsPath)}>
      {children}
    </CardActionArea>
  );
};

CardWrapper.propTypes = {
  children: PropTypes.node,
  /** @type {Warehouse} */
  warehouse: PropTypes.object,
};

export default CardWrapper;
