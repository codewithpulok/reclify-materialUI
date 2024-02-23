import { TransactionDetailsView } from 'src/sections/private/dashboard/transactions';

export const metadata = {
  title: 'Transaction Details - Racklify',
};

export default async function TransactionDetailsPage({ params }) {
  return <TransactionDetailsView id={params.id} />;
}
