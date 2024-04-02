import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { globalColors } from "./utils/GlobalColors";

export const CustomTable = ({ columns, data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [dataTable, setDataTable] = useState([]);

  const filterData = (array, lengthPage) => {
    const dataFilter = [];
    for (let i = 0; i < array.length; i += lengthPage) {
      dataFilter.push(array.slice(i, i + lengthPage));
    }
    return dataFilter;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    console.log(event, newPage);
    setPage(page + 1);
  }

  useEffect(() => {
    console.log(filterData(data, rowsPerPage)[page])
    setDataTable(filterData(data, rowsPerPage)[page]);
  }, [data, page]);

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "none",
          width: "auto",
          border: `1px solid ${globalColors?.accentuated}`,
          fontFamily: "Public Sans",
          borderRadius: "10px",
        }}
      >
        <Table
          sx={{ minWidth: 650, boxShadow: "none" }}
          aria-label="simple table"
        >
          <TableHead
            style={{
              backgroundColor: globalColors?.dominant,
            }}
          >
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  sortDirection={"desc"}
                  style={{
                    color: globalColors?.accentuated,
                    fontFamily: "Public Sans",
                    fontWeight: 900,
                  }}
                >
                  <TableSortLabel>{column?.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dataTable?.map((rowData) => (
              <TableRow key={rowData?.id}>
                {columns?.map((column) => (
                  <TableCell
                    style={{
                      color: globalColors?.textColor,
                      fontFamily: "Public Sans",
                    }}
                    component="th"
                    scope="row"
                  >
                    {rowData?.[column?.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                // colSpan={3}
                count={dataTable?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
