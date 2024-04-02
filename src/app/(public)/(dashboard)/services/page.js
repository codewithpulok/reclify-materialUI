import { notFound } from 'next/navigation';
import Loading from 'src/app/loading';
import { ServicesListingView } from 'src/sections/public/dashboard/services';
import { getServices } from 'src/utils/api/server/services/service.api';

export const metadata = {
  title: 'Services',
  keywords: [
    'Warehouse rental services',
    'Warehouse leasing services',
    'Storage solutions services',
    'Logistics management services',
    'Distribution center services',
    'Supply chain solutions services',
    'Commercial storage services',
    'Fulfillment services',
    'Third-party logistics (3PL) services',
    'Warehouse technology services',
    'E-commerce fulfillment services',
    'Industrial real estate services',
    'Warehouse management services',
    'Inventory management services',
    'Warehousing infrastructure services',
    'Flexible storage options services',
    'Warehouse consulting services',
    'Warehouse operations services',
    'Warehouse relocation services',
    'Warehouse maintenance services',
  ],
};

const ServicesListingPage = async () => {
  const response = await getServices();

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success) return <ServicesListingView services={response.results} />;

  return <Loading />;
};

ServicesListingPage.propTypes = {};

export default ServicesListingPage;
