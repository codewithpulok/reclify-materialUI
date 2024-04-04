'use client';

import { Tab, Tabs, tabsClasses } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

/**
 * @param {UserTabs.propTypes} props
 * @returns {JSX.Element}
 */
const UserTabs = (props) => {
  const { tabs } = props;

  // app states
  const [currentTab, setCurrentTab] = useState('profile');

  // handle tab change function
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        bgcolor: 'background.paper',
        [`& .${tabsClasses.flexContainer}`]: {
          pr: { md: 3 },
          justifyContent: {
            sm: 'center',
            md: 'flex-end',
          },
        },
        pl: {
          xs: 1.5,
          sm: 0,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
      ))}
    </Tabs>
  );
};

UserTabs.propTypes = {
  /** @type {{value: string, icon: any, label: string}} */
  tabs: PropTypes.arrayOf(PropTypes.object),
};

export default UserTabs;
