'use client';

import { Tab, Tabs, tabsClasses } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import useHash from 'src/hooks/use-hash';

/**
 * @param {UserTabs.propTypes} props
 * @returns {JSX.Element}
 */
const UserTabs = (props) => {
  const { tabs = [] } = props;
  const router = useRouter();
  const pathname = usePathname();

  // app states
  const hash = useHash();
  const validPath = useMemo(() => {
    if (!Array.isArray(tabs) || !tabs[0]?.value) return undefined;

    if (tabs.find((t) => t.value === hash) === undefined) return tabs[0].value;

    return hash;
  }, [hash, tabs]);

  // handle tab change function
  const handleChangeTab = useCallback(
    (event, newValue) => {
      router.push(`${pathname}${newValue}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <Tabs
      value={validPath}
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
  /** @type {{value: string, icon: any, label: string}[]} */
  tabs: PropTypes.arrayOf(PropTypes.object),
};

export default UserTabs;
