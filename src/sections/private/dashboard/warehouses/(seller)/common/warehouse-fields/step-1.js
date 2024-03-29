import { Grid } from '@mui/material';
import {
  predefinedAmenities,
  predefinedFacility,
  predefinedFeatures,
} from 'src/assets/data/predefined-fields/warehouse';
import { DocumentsUploadField, PredefinedFields } from 'src/components/common/custom-fields';
import Label from 'src/components/common/label';

/**
 * @param {Step1.propTypes} props
 * @returns {JSX.Element}
 */
const Step1 = (props) => (
  <Grid container spacing={1.2}>
    <Grid item xs={12} md={6}>
      <Grid container spacing={1.2}>
        <Grid item xs={12}>
          <PredefinedFields
            name="features"
            fields={predefinedFeatures}
            label="Expertise"
            defaultExpanded
            showIcon
          />
        </Grid>
        <Grid item xs={12}>
          <PredefinedFields
            name="facilityDetails"
            fields={predefinedFacility}
            label="Facility Details"
            defaultExpanded
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={6}>
      <Grid container spacing={1.2}>
        <Grid item xs={12}>
          <PredefinedFields
            name="amenities"
            fields={predefinedAmenities}
            label="Amenities"
            defaultExpanded
          />
        </Grid>
        <Grid item xs={12}>
          <Label sx={{ mb: 1 }}>Warehouse Documents</Label>
          <DocumentsUploadField name="documents" />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

Step1.propTypes = {};

export default Step1;
