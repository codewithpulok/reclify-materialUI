import { CustomerDetailsView } from 'src/sections/public/products/users';

const CustomerDetailsPage = async ({ params }) => <CustomerDetailsView id={params.id} />;

export default CustomerDetailsPage;
