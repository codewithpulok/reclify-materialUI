'use client';

import PropTypes from 'prop-types';
// local components
import { notFound } from 'next/navigation';
import { ErrorState } from 'src/components/common/custom-state';
import { LoadingScreen } from 'src/components/common/loading-screen';
import TransactionDetails from 'src/components/transaction/details';
import { useGetTransactionQuery } from 'src/redux-toolkit/services/transactionApi';

const Props = {
  id: PropTypes.string.isRequired,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
function DetailsView(props) {
  const { id } = props;
  const transactionResult = useGetTransactionQuery(id, { skip: !id });

  console.log(transactionResult);

  // if error occured
  if (
    (transactionResult.isError || transactionResult.data?.isError) &&
    !transactionResult.isLoading
  )
    return <ErrorState />;

  // if there is no warehouse then show error
  if (transactionResult.data?.statusCode === 404) notFound();

  // on request success
  if (transactionResult.isSuccess && transactionResult.data?.success) {
    return <TransactionDetails transaction={transactionResult.data?.results} />;
  }

  return <LoadingScreen />;
}

DetailsView.propTypes = Props;

export default DetailsView;
