'use client';

import { useEffect } from 'react';

import {
  CancelTransactionDialog,
  CompleteTransactionDialog,
} from 'src/components/common/custom-dialog';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useListTransactionQuery } from 'src/redux-toolkit/services/transactionApi';
import TransactionTable from '../common/transaction-table';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'warehouse', label: 'Warehouse' },
  { id: 'invoice', label: 'Invoice' },
  { id: 'customer', label: 'Customer' },
  { id: 'createdAt', label: 'Date', width: 140 },
  { id: 'price', label: 'Price', width: 140 },
  { id: 'status', label: 'Status', width: 110 },
  { id: 'actions', width: 30 },
];

// ----------------------------------------------------------------------

const TransactionsSellerTable = () => {
  const { user } = useAppSelector(selectAuth);

  // data states
  const listResponse = useListTransactionQuery();

  // dialog states
  const completeDialog = useDialog();
  const cancelDialog = useDialog();

  // fetch transactions
  useEffect(() => {
    if (user?.id) {
      listResponse.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <>
      <TransactionTable
        data={listResponse?.data?.results || []}
        tableHead={TABLE_HEAD}
        onCancelOrder={cancelDialog.onOpen}
        onCompleteOrder={completeDialog.onOpen}
        isError={listResponse.isError}
        isLoading={listResponse.isLoading || listResponse.isFetching}
        isSuccess={listResponse.isSuccess}
      />

      <CancelTransactionDialog
        open={cancelDialog.open}
        onClose={cancelDialog.onClose}
        transaction={cancelDialog.value}
      />

      <CompleteTransactionDialog
        open={completeDialog.open}
        onClose={completeDialog.onClose}
        transaction={completeDialog.value}
      />
    </>
  );
};

export default TransactionsSellerTable;
