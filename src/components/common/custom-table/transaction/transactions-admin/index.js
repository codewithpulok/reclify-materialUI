'use client';

import { useEffect } from 'react';

import {
  ApproveTransactionDialog,
  CancelTransactionAdminDialog,
} from 'src/components/common/custom-dialog';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useListTransactionQuery } from 'src/redux-toolkit/services/adminApi';
import TransactionTable from '../common/transaction-table';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'warehouse', label: 'Warehouse' },
  { id: 'invoice', label: 'Invoice' },
  { id: 'seller', label: 'Seller' },
  { id: 'customer', label: 'Merchant' },
  { id: 'createdAt', label: 'Date', width: 140 },
  { id: 'price', label: 'Price', width: 140 },
  { id: 'status', label: 'Status', width: 110 },
  { id: 'actions', width: 30 },
];

// ----------------------------------------------------------------------

const TransactionsAdminTable = () => {
  const { user } = useAppSelector(selectAuth);

  // data states
  const listResponse = useListTransactionQuery();

  // dialog states
  const approveDialog = useDialog();
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
        onApproveOrder={approveDialog.onOpen}
        isError={listResponse.isError}
        isLoading={listResponse.isLoading || listResponse.isFetching}
        isSuccess={listResponse.isSuccess}
      />

      <ApproveTransactionDialog
        onClose={approveDialog.onClose}
        open={approveDialog.open}
        transaction={approveDialog.value}
      />

      <CancelTransactionAdminDialog
        onClose={cancelDialog.onClose}
        open={cancelDialog.open}
        transaction={cancelDialog.value}
      />
    </>
  );
};

// ----------------------------------------------------------------------

export default TransactionsAdminTable;
