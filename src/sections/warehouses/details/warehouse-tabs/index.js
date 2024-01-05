import { Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import FacilityTab from './facility-tab';
import RulesTab from './rules-tab';
import ServicesTab from './services-tab';

const WarehouseTabsProps = {
  /** @type {WarehouseFacilityDetails} */
  facilityDetails: PropTypes.object.isRequired,
  /** @type {WarehouseServices} */
  services: PropTypes.object.isRequired,
  /** @type {String[]} */
  rules: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {WarehouseTabsProps} props
 * @returns {JSX.Element}
 */
const WarehouseTabs = (props) => {
  const { facilityDetails, rules, services, sx = {} } = props;

  const [currentTab, setCurrentTab] = useState('facility');

  return (
    <Box sx={{ ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={currentTab}
          onChange={(_e, value) => setCurrentTab(value)}
          textColor="primary"
          TabIndicatorProps={{ sx: { bgcolor: 'primary.main' } }}
        >
          <Tab label="Facility Details" value="facility" />
          <Tab label="Available Services and Rates" value="services" />
          <Tab label="Facility Rules" value="rules" />
        </Tabs>
      </Box>
      {currentTab === 'facility' && <FacilityTab facilityDetails={facilityDetails} />}
      {currentTab === 'services' && <ServicesTab services={services} />}
      {currentTab === 'rules' && <RulesTab rules={rules} />}
    </Box>
  );
};

WarehouseTabs.propTypes = WarehouseTabsProps;

export default WarehouseTabs;
