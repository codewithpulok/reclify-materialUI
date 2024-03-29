'use client';

import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

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
import MembershipRow from './membership-row';

// ----------------------------------------------------------------------

const defaultFilters = {};

const Props = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
  tableHead: PropTypes.arrayOf(PropTypes.object),
  /** @type {Membership[]} */
  data: PropTypes.array,
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
const MembershipTable = (props) => {
  const { tableHead, data, isError, isLoading = true, isSuccess } = props;

  // table states
  const table = useTable({
    defaultOrderBy: 'createdAt',
    defaultOrder: 'desc',
    defaultRowsPerPage: 10,
  });
  const [tableData, setTableData] = useState([]);
  const [filters] = useState(defaultFilters);
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const notFound = !!tableData?.length && !dataFiltered?.length;

  // update table data
  useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  return (
    <Card>
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
                      <MembershipRow key={row.id} row={row} show={tableHead.map((t) => t.id)} />
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
  );
};

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  return inputData;
}

MembershipTable.propTypes = Props;

export default MembershipTable;
