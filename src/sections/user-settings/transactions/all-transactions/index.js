'use client';

import { useCallback, useState } from 'react';

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

import { getAllTransactions, TRANSACTION_STATUS_OPTIONS } from 'src/assets/dummy';
import TransactionDialog from './details-dialog';
import TransactionTableRow from './table-row';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...TRANSACTION_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'warehouse', label: 'Warehouse' },
  { id: 'seller', label: 'Seller' },
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

const AllTransactions = () => {
  const transactions = getAllTransactions();
  const table = useTable({ defaultOrderBy: 'createdAt' });
  const [tableData] = useState(transactions);

  const [filters, setFilters] = useState(defaultFilters);

  const [transactionDialog, setTransactionDialog] = useState({
    open: false,
    transaction: undefined,
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const canReset = !!filters.name || filters.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

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
              color={
                (tab.value === 'completed' && 'success') ||
                (tab.value === 'pending' && 'warning') ||
                (tab.value === 'declined' && 'error') ||
                'default'
              }
            >
              {tab.value === 'all' && tableData.length}
              {tab.value === 'completed' &&
                tableData.filter((order) => order.status === 'completed').length}

              {tab.value === 'pending' &&
                tableData.filter((order) => order.status === 'pending').length}
              {tab.value === 'canceled' &&
                tableData.filter((order) => order.status === 'canceled').length}
              {tab.value === 'declined' &&
                tableData.filter((order) => order.status === 'refunded').length}
            </Label>
          }
        />
      )),
    [filters.status, tableData]
  );

  // open transaction details
  const openTransactionDialog = (transaction) => {
    setTransactionDialog({ open: true, transaction });
  };
  // close transaction details
  const closeTransactionDialog = () => {
    setTransactionDialog((prev) => ({ ...prev, open: false }));
  };

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
                  <TransactionTableRow
                    key={row.id}
                    row={row}
                    onViewTransaction={() => openTransactionDialog(row)}
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

      <TransactionDialog
        open={transactionDialog.open}
        transaction={transactionDialog.transaction}
        onClose={closeTransactionDialog}
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

export default AllTransactions;
