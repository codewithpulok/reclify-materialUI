import PropTypes from 'prop-types';

import { PostDetailsHomeView } from 'src/sections/news/view';
import axios, { endpoints } from 'src/utils/axios';
import { paramCase } from 'src/utils/change-case';

// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const res = await axios.get(endpoints.post.list);

  return res.data.posts.map((post) => ({
    slug: paramCase(post.title),
  }));
}

export const metadata = {
  title: 'News Details - Racklify',
};

const NewsDetailsPage = ({ params }) => {
  const { slug } = params;
  return <PostDetailsHomeView title={slug} />;
};

NewsDetailsPage.propTypes = {
  params: PropTypes.shape({
    slug: PropTypes.string,
  }),
};
export default NewsDetailsPage;
