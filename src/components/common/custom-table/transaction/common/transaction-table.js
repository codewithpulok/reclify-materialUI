'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

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
  TableSkeleton,
  useTable,
} from 'src/components/common/table';

import { TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { ErrorState } from 'src/components/common/custom-state';
import { getTransactionStatusColor, transactionStatusOptions } from 'src/constant/transaction';
import { useDialog } from 'src/hooks/use-dialog';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';
import TransactionDetailsDialog from './transaction-details-dialog';
import TransactionRow from './transaction-row';
// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...transactionStatusOptions];

const defaultFilters = {
  name: '',
  status: 'all',
};

const Props = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
  tableHead: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.array,
  onApproveOrder: PropTypes.func,
  onCancelOrder: PropTypes.func,
  onCompleteOrder: PropTypes.func,
};

// ----------------------------------------------------------------------

const TableLoading = () => (
  <>
    {[...Array(5).keys()].map((_e, i) => (
      <TableSkeleton key={i} />
    ))}
  </>
);

const TableError = () => (
  <TableRow>
    <TableCell colSpan={12}>
      <ErrorState />
    </TableCell>
  </TableRow>
);

// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const TransactionTable = (props) => {
  const {
    tableHead,
    data,
    onApproveOrder,
    onCancelOrder,
    onCompleteOrder,
    isError,
    isLoading = true,
    isSuccess,
  } = props;

  const { user } = useAppSelector(selectAuth);

  // dialog states
  const transactionDialog = useDialog();

  // table states
  const table = useTable({ defaultOrderBy: 'createdAt', defaultOrder: 'desc' });
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const notFound = !!tableData?.length && !dataFiltered?.length;

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

  // update table data
  useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  const selectedTransaction = useMemo(
    () => tableData.find((t) => t.id === transactionDialog?.value),
    [tableData, transactionDialog?.value]
  );

  return (
    <>
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
                headLabel={tableHead}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {isLoading && <TableLoading />}

                {!isLoading && isError && <TableError />}

                {!isLoading && !isError && isSuccess && !!tableData?.length && (
                  <>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row, index) => (
                        <TransactionRow
                          key={row.id}
                          row={row}
                          onViewTransaction={() => transactionDialog.onOpen(row.id)}
                          onCancelOrder={onCancelOrder}
                          onApproveOrder={onApproveOrder}
                          onCompleteOrder={onCompleteOrder}
                          show={tableHead.map((t) => t.id)}
                          isAdmin={user?.userType === 'admin'}
                        />
                      ))}

                    <TableEmptyRows
                      height={72}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                    />

                    <TableNoData notFound={notFound} />
                  </>
                )}
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
      </Card>
      <TransactionDetailsDialog
        open={transactionDialog.open}
        transaction={selectedTransaction}
        onClose={transactionDialog.onClose}
        onApproveOrder={onApproveOrder}
        onCancelOrder={onCancelOrder}
        onCompleteOrder={onCompleteOrder}
      />
    </>
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

TransactionTable.propTypes = Props;

export default TransactionTable;
