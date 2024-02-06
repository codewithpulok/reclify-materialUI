import { CustomerDetailsView } from 'src/sections/private/dashboard/users';

const CustomerDetailsPage = async ({ params }) => <CustomerDetailsView id={params.id} />;

export default CustomerDetailsPage;
