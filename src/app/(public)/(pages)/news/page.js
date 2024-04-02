import { notFound } from 'next/navigation';
import Loading from 'src/app/loading';
import { NewsListingView } from 'src/sections/public/pages/news';
import { getPosts } from 'src/utils/api/server/services/posts.api';

export const metadata = {
  title: 'News',
  keywords: [
    'Warehouse rental news',
    'Latest updates',
    'Warehouse industry news',
    'Warehouse leasing updates',
    'Storage solutions news',
    'Logistics management news',
    'Distribution center news',
    'Supply chain solutions updates',
    'Commercial storage news',
    'Warehouse management news',
    'Fulfillment services updates',
    'Third-party logistics (3PL) news',
    'Warehouse technology news',
    'E-commerce fulfillment updates',
    'Industrial real estate news',
    'Warehouse rental announcements',
    'Industry trends',
    'Warehouse rental press releases',
    'Warehouse market insights',
    'Warehouse rental events',
  ],
};

/**
 * @param {NewsPage.propTypes} props
 * @returns {JSX.Element}
 */
const NewsPage = async (props) => {
  const response = await getPosts();

  if (response.isError) notFound();

  if (response.success) return <NewsListingView news={response.results} />;

  return <Loading />;
};

NewsPage.propTypes = {};

export default NewsPage;
