import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from 'src/app/loading';
import { getAvailableServiceTypes, getServiceType } from 'src/constant/service-types';
import { ServicesTypeListingView } from 'src/sections/public/dashboard/services';
import { getServices } from 'src/utils/api/server/services/service.api';

const keywords = {
  transportation: [
    'Transportation services',
    'Freight transportation',
    'Logistics services',
    'Cargo transport',
    'Shipping services',
    'Trucking services',
    'Supply chain logistics',
    'Freight forwarding',
    'Parcel delivery services',
    'Air freight services',
    'Ocean freight services',
    'Rail freight services',
    'Intermodal transportation',
    'Warehousing and distribution',
    'Last mile delivery services',
    'Express delivery services',
    'LTL shipping services',
    'FTL shipping services',
    'Third-party logistics (3PL)',
    'Cross-border transportation',
  ],
  software: [
    'Software services',
    'Software solutions',
    'Software development',
    'Custom software development',
    'Software consulting',
    'Software implementation',
    'Software integration',
    'Software maintenance',
    'Enterprise software',
    'Business software',
    'Cloud software',
    'SaaS (Software as a Service)',
    'Mobile app development',
    'Web application development',
    'UI/UX design services',
    'Quality assurance (QA) services',
    'Software testing',
    'Software deployment',
    'Software support',
    'Software upgrades',
  ],
  packaging: [
    'Packaging services',
    'Supply chain solutions',
    'Packaging solutions',
    'Packaging design',
    'Custom packaging',
    'Product packaging',
    'Shipping packaging',
    'Packaging materials',
    'Packaging supplies',
    'Packaging distribution',
    'Warehousing and packaging',
    'Packaging logistics',
    'Packaging fulfillment',
    'Bulk packaging',
    'Industrial packaging',
    'Retail packaging',
    'Eco-friendly packaging',
    'Packaging consulting',
    'Packaging outsourcing',
    'Packaging automation',
  ],
  manufacturing: [
    'Manufacturing services',
    'Wholesale services',
    'Product manufacturing',
    'Contract manufacturing',
    'Custom manufacturing',
    'Manufacturing outsourcing',
    'Manufacturing solutions',
    'Wholesale distribution',
    'Bulk wholesale',
    'Wholesale products',
    'Wholesale suppliers',
    'Wholesale distribution',
    'Industrial manufacturing',
    'Production manufacturing',
    'Manufacturing logistics',
    'Manufacturing consulting',
    'Supply chain manufacturing',
    'Wholesale trade',
    'Manufacturing partnerships',
    'Manufacturing quality control',
  ],
  marketing: [
    'Marketing services',
    'Creative services',
    'Digital marketing',
    'Advertising services',
    'Content marketing',
    'Social media marketing',
    'Graphic design services',
    'Branding services',
    'Website design services',
    'SEO services',
    'PPC services',
    'Email marketing services',
    'Copywriting services',
    'Video production services',
    'Photography services',
    'Event marketing',
    'Public relations services',
    'Marketing strategy',
    'Creative consultancy',
    'Campaign management',
  ],
  consultants: [
    'Consulting services',
    'Business consulting',
    'Management consulting',
    'Strategy consulting',
    'Financial consulting',
    'Marketing consulting',
    'Technology consulting',
    'IT consulting',
    'HR consulting',
    'Supply chain consulting',
    'Operations consulting',
    'Legal consulting',
    'Healthcare consulting',
    'Environmental consulting',
    'Engineering consulting',
    'Education consulting',
    'Government consulting',
    'International consulting',
    'Small business consulting',
    'Startup consulting',
  ],
};

export const generateStaticParams = async () =>
  getAvailableServiceTypes().map((service) => ({
    type: service.value,
  }));

export const generateMetadata = async ({ params }) => {
  const service = getServiceType(params.type);

  return {
    title: `${service.label} Services - Racklify`,
    keywords: keywords[service.value],
  };
};

/**
 * @param {ServicesByTypePage.propTypes} props
 * @returns {JSX.Element}
 */
const ServicesByTypePage = async (props) => {
  const { params } = props;
  const response = await getServices();

  if (response.statusCode === 404) return notFound();

  if (response.isError) throw new Error(response.message);

  if (response.success)
    return <ServicesTypeListingView serviceType={params.type} services={response.results} />;

  return <Loading />;
};

ServicesByTypePage.propTypes = {
  params: {
    type: PropTypes.string,
  },
};

export default ServicesByTypePage;
