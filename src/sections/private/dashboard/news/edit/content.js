import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import CustomBreadcrumbs from 'src/components/common/custom-breadcrumbs/custom-breadcrumbs';
import useAppearance from 'src/redux-toolkit/features/appearance/use-appearance';
import { paths } from 'src/routes/paths';
import EditForm from './edit-form';

const Props = {
  /** @type {NewsType} */
  post: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const EditContent = (props) => {
  const { post } = props;
  const appearance = useAppearance();

  return (
    <Container maxWidth={appearance.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'News',
            href: paths.dashboard.news.root,
          },
          {
            name: post?.title,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <EditForm currentPost={post} />
    </Container>
  );
};

EditContent.propTypes = Props;

export default EditContent;
