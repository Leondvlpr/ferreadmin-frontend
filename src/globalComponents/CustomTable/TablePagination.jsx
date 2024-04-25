import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const TablePagination = ({ data, handleChangePage }) => {
  const pages = ["5", "10", "25"];
  const [currentPage, setCurrentPage] = useState(5);

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const filterInformation = (data) => {
    console.log(data, "probando paginación");
    return data?.slice(0, currentPage);
  };

  useEffect(() => {
    const dataFilter = filterInformation(data);
    console.log(dataFilter);
    handleChangePage?.(dataFilter);
  }, [currentPage]);

  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginRight: "20px",
          display: "flex",
        }}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentPage}
              style={{
                width: "80px",
                height: "40px",
              }}
              onChange={(e) => handlePageChange(e.target.value)}
            >
              {pages.map((valueArray) => (
                <MenuItem value={valueArray}>{valueArray}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <p
          style={{
            marginRight: "40px",
          }}
        >
          16/20
        </p>

        <IconButton
          style={{
            width: 40,
            height: 40,
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          style={{
            width: 40,
            height: 40,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
    </div>
  );
};
