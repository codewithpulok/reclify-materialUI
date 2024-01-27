import PropTypes from 'prop-types';
import { memo } from 'react';

import Stack from '@mui/material/Stack';

import { Divider } from '@mui/material';
import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionHorizontal({ data, slotProps, sx, ...other }) {
  return (
    <Stack
      component="nav"
      id="nav-section-horizontal"
      direction="row"
      alignItems="center"
      spacing={`${slotProps?.gap || 6}px`}
      sx={{
        mx: 'auto',
        ...sx,
      }}
      {...other}
    >
      {data.map((group, index) => (
        <Group key={group.subheader || index} items={group.items} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

NavSectionHorizontal.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
  slotProps: PropTypes.object,
};

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

function Group({ items, slotProps }) {
  return (
    <>
      {items.map((list, index) => {
        if (list?.type === 'DIVIDER')
          return <Divider key={index} sx={{ mb: 0.5, borderStyle: 'dashed' }} />;
        return <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />;
      })}
    </>
  );
}

Group.propTypes = {
  items: PropTypes.array,
  slotProps: PropTypes.object,
};
