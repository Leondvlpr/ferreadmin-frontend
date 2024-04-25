import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { globalColors } from "../utils/GlobalColors";
import { TablePagination } from "./TablePagination";

export const CustomTable = ({ columns, data }) => {
  const [dataTable, setDataTable] = useState([]);
  const [paginatedInformation, setPaginatedInformation] = useState([]);

  useEffect(() => {
    setDataTable(data);
  }, [data]);

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
            {paginatedInformation?.map((rowData) => (
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
        </Table>
        <TablePagination
          data={dataTable}
          handleChangePage={(filteredData) => {
            setPaginatedInformation(filteredData);
          }}
        />
      </TableContainer>
    </div>
  );
};
