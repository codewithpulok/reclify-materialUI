import PropTypes from 'prop-types';
import { memo } from 'react';

import Stack from '@mui/material/Stack';

import { Divider } from '@mui/material';
import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionMini({ data, slotProps, ...other }) {
  return (
    <Stack component="nav" id="nav-section-mini" spacing={`${slotProps?.gap || 4}px`} {...other}>
      {data.map((group, index) => (
        <Group key={group.subheader || index} items={group.items} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

NavSectionMini.propTypes = {
  data: PropTypes.array,
  slotProps: PropTypes.object,
};

export default memo(NavSectionMini);

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
