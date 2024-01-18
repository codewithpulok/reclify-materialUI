import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { predefinedApprovedUses } from 'src/assets/data';
import { getIconify } from 'src/components/common/iconify/utilities';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const WarehouseApprovedUsesProps = {
  /** @type {WarehouseApprovedUses} */
  approvedUses: PropTypes.object.isRequired,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 *  Warehouse description
 * @param {WarehouseApprovedUsesProps} props
 * @returns
 */
const WarehouseApprovedUses = (props) => {
  const { approvedUses, sx } = props;

  return (
    <WarehouseDetailsBox title="Approved Uses" sx={sx}>
      <Grid spacing={0.7} container>
        {predefinedApprovedUses.map((uses) => {
          const currentUse = approvedUses[uses.key];
          if (!currentUse) return null;
          return (
            <Grid
              key={uses.key}
              item
              xs={12}
              sm={6}
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {uses?.icon && getIconify(uses.icon, 16, { color: 'text.secondary' })}
              <Typography variant="subtitle2">{uses.label}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </WarehouseDetailsBox>
  );
};

WarehouseApprovedUses.propTypes = WarehouseApprovedUsesProps;

export default WarehouseApprovedUses;
