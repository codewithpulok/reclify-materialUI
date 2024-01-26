'use client';

import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tabs from '@mui/material/Tabs';

import Label from 'src/components/common/label';
import Scrollbar from 'src/components/common/scrollbar';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/common/table';

import { getTransactionStatusColor, TRANSACTION_STATUS_OPTIONS } from 'src/assets/dummy';
import {
  CancelTransactionDialog,
  ConfirmTransactionDialog,
} from 'src/components/common/custom-dialog';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import { useLazyListTransactionQuery } from 'src/redux-toolkit/services/transactionApi';
import TransactionDetailsDialog from '../common/transaction-details-dialog';
import TransactionRow from '../common/transaction-row';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...TRANSACTION_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'warehouse', label: 'Warehouse' },
  { id: 'customer', label: 'Customer' },
  { id: 'createdAt', label: 'Date', width: 140 },
  { id: 'price', label: 'Price', width: 140 },
  { id: 'status', label: 'Status', width: 110 },
  { id: 'actions', width: 30 },
];

const defaultFilters = {
  name: '',
  status: 'all',
};

// ----------------------------------------------------------------------

const TransactionsSellerTable = () => {
  const { user } = useAppSelector(selectAuth);

  // data states
  const [getTransactions, transactionsResponse] = useLazyListTransactionQuery();

  // dialog states
  const transactionDialog = useDialog();
  const confirmDialog = useDialog();
  const cancelDialog = useDialog();

  // table states
  const table = useTable({ defaultOrderBy: 'createdAt' });
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });
  const canReset = !!filters.name || filters.status !== 'all';
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  // filter functions
  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );
  const handleFilterStatus = useCallback(
    (_event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const renderTabs = useCallback(
    () =>
      STATUS_OPTIONS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={
                ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
              }
              color={getTransactionStatusColor(tab.value)}
            >
              {tab.value === 'all'
                ? tableData.length
                : tableData.filter((order) => order.status === tab.value).length}
            </Label>
          }
        />
      )),
    [filters.status, tableData]
  );

  // fetch transactions
  useEffect(() => {
    if (user) {
      getTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // update table data
  useEffect(() => {
    if (transactionsResponse.isSuccess && transactionsResponse.data?.success) {
      setTableData(transactionsResponse.data.results);
    }
  }, [transactionsResponse]);

  return (
    <Card>
      <Tabs
        value={filters.status}
        onChange={handleFilterStatus}
        sx={{
          px: { xs: 1, sm: 1.5, md: 2.5 },
          boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        {renderTabs()}
      </Tabs>

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <TransactionRow
                    key={row.id}
                    row={row}
                    onCancelOrder={() => cancelDialog.onOpen(row)}
                    onConfirmOrder={() => confirmDialog.onOpen(row)}
                    onViewTransaction={() => transactionDialog.onOpen(row)}
                    show={TABLE_HEAD.map((t) => t.id)}
                  />
                ))}

              <TableEmptyRows
                height={72}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />

      <TransactionDetailsDialog
        open={transactionDialog.open}
        transaction={transactionDialog.value}
        onClose={transactionDialog.onClose}
        onCancelOrder={() => cancelDialog.onOpen(transactionDialog.value)}
        onConfirmOrder={() => confirmDialog.onOpen(transactionDialog.value)}
      />

      <CancelTransactionDialog
        open={cancelDialog.open}
        onClose={cancelDialog.onClose}
        transaction={cancelDialog.value}
      />

      <ConfirmTransactionDialog
        open={confirmDialog.open}
        onClose={confirmDialog.onClose}
        transaction={confirmDialog.value}
      />
    </Card>
  );
};

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { status, name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  return inputData;
}

export default TransactionsSellerTable;
