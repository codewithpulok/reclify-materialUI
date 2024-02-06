import PropTypes from 'prop-types';

import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useFormContext } from 'react-hook-form';
import { RHFEditor, RHFSwitch, RHFTextField } from 'src/components/common/hook-form';
import { useResponsive } from 'src/hooks/use-responsive';
import PostCoverField from './post-cover-field';

const Props = {
  /** @type {'EDIT' | "CREATE"} */
  formType: PropTypes.oneOf(['EDIT', 'CREATE']),
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const PostFields = (props) => {
  const { formType } = props;

  // form state
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  const mdUp = useResponsive('up', 'md');

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="title" label="Post Title" />

            <RHFTextField name="description" label="Description" multiline rows={3} />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Cover</Typography>
              <PostCoverField />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFSwitch label="Publish" name="isPublished" />
            <RHFSwitch label="Enable Comments" name="allowComment" />
            <RHFSwitch label="Featured" name="isFeatured" />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid
        xs={12}
        md={8}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      >
        <Button color="inherit" variant="outlined" size="large" type="reset">
          Cancel
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {formType === 'EDIT' ? 'Save Changes' : 'Create Post'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <Grid container spacing={3}>
      {renderDetails}

      {renderProperties}

      {renderActions}
    </Grid>
  );
};

PostFields.propTypes = Props;

export default PostFields;
