import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
  useTableState
} from "react-table";

const StyledTable = styled.table`
  width: 100%;
`;

const HeadRow = styled.tr`
  height: 46px;
  border-bottom: 1px solid #ccc;
`;

const BodyRow = styled.tr`
  height: 46px;
  border-bottom: 1px solid #ccc;
`;

const Table = ({ activeOption, data, columns }) => {
  console.log("data", data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    setPageSize,
    pageCount,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount
            },
            null,
            2
          )}
        </code>
      </pre>
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>

      <StyledTable
        {...getTableProps()}
        defaultPageSize={10}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        showPaginationBottom={true}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <HeadRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")} </th>
              ))}
            </HeadRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            const { status } = row.values;
            return (
              <BodyRow {...row.getRowProps()} status={status}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </BodyRow>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
};

export default Table;
